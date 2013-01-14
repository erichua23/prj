function setCaretSelection(options, el) {
    var inp = el;
    if(inp.createTextRange)
    {
        var selRange = inp.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', options.start);
        selRange.moveEnd('character',options.end - options.start);
        selRange.select();
    }
    else if(inp.setSelectionRange)
    {
        inp.focus();
        inp.setSelectionRange(options.start, options.end);
    }
}
function getCaretSelection(el) {
    var inp = el, start = 0, end = 0;
    if(!isNaN(inp.selectionStart))
    {
        start = inp.selectionStart;
        end = inp.selectionEnd;
    }
    else if( inp.createTextRange )
    {
        var inpTxtLen = inp.value.length, jqueryTxtLen = $(el).val().length;
        var inpRange = inp.createTextRange(), collapsedRange = inp.createTextRange();

        inpRange.moveToBookmark(document.selection.createRange().getBookmark());
        collapsedRange.collapse(false);

        start = inpRange.compareEndPoints('StartToEnd', collapsedRange) > -1 ? jqueryTxtLen : inpRange.moveStart('character', -inpTxtLen);
        end = inpRange.compareEndPoints('EndToEnd', collapsedRange) > -1 ? jqueryTxtLen : inpRange.moveEnd('character', -inpTxtLen);
    }
    return {start: Math.abs(start), end: Math.abs(end)};

}

function caretSelection(options) {
    if(options && !isNaN(options.start) && !isNaN(options.end))
    {
        setCaretSelection(options);
    }
    else
    {
        return getCaretSelection();
    }
}

function replaceCaretSelection(options, el) {
    var pos = caretSelection();
    $(el).val( $(el).val().substring(0,pos.start) + options.text + $(el).val().substring(pos.end) );
    if(options.insPos == 'before')
    {
        caretSelection({start: pos.start, end: pos.start});
    }
    else if( options.insPos == 'after' )
    {
        caretSelection({start: pos.start + options.text.length, end: pos.start + options.text.length});
    }
    else if( options.insPos == 'select' )
    {
        caretSelection({start: pos.start, end: pos.start + options.text.length});
    }
}

var tabIndent = {
    version: '0.1.6',
    config: {
        images: '../images/'
    },
    events: {
        keydown: function(e) {
            alert('key down');
            if (e.keyCode === 9) {
                e.preventDefault();
                var	currentStart = getCaretSelection(this).start,
                    currentEnd = getCaretSelection(this).end;
                console.log('currentStart ' + currentStart);
                if (e.shiftKey === false) {
                    // Normal Tab Behaviour
                    if (!tabIndent.isMultiLine(this)) {
                        // Add tab before selection, maintain highlighted text selection
                        this.value = this.value.slice(0, currentStart) + "\t" + this.value.slice(currentStart);
                        setCaretSelection({
                            start: currentStart + 1,
                            end: currentEnd + 1
                        }, this);
                    } else {
                        // Iterating through the startIndices, if the index falls within selectionStart and selectionEnd, indent it there.
                        var	startIndices = tabIndent.findStartIndices(this),
                            l = startIndices.length,
                            newStart = undefined,
                            newEnd = undefined,
                            affectedRows = 0;

                        while(l--) {
                            var lowerBound = startIndices[l];
                            if (startIndices[l+1] && currentStart != startIndices[l+1]) {
                                lowerBound = startIndices[l+1];
                            }

                            if (lowerBound >= currentStart && startIndices[l] < currentEnd) {
                                this.value = this.value.slice(0, startIndices[l]) + "\t" + this.value.slice(startIndices[l]);

                                newStart = startIndices[l];
                                if (!newEnd) {
                                    newEnd = (startIndices[l+1] ? startIndices[l+1] - 1 : 'end');
                                }
                                affectedRows++;
                            }
                        }

                        this.selectionStart = newStart;
                        this.selectionEnd = (newEnd !== 'end' ? newEnd + affectedRows : this.value.length);
                    }
                } else {
                    // Shift-Tab Behaviour
                    if (!tabIndent.isMultiLine(this)) {
                        if (this.value.substr(currentStart - 1, 1) == "\t") {
                            // If there's a tab before the selectionStart, remove it
                            this.value = this.value.substr(0, currentStart - 1) + this.value.substr(currentStart);
                            this.selectionStart = currentStart - 1;
                            this.selectionEnd = currentEnd - 1;
                        } else if (this.value.substr(currentStart - 1, 1) == "\n" && this.value.substr(currentStart, 1) == '\t') {
                            // However, if the selection is at the start of the line, and the first character is a tab, remove it
                            this.value = this.value.substring(0, currentStart) + this.value.substr(currentStart + 1);
                            this.selectionStart = currentStart;
                            this.selectionEnd = currentEnd - 1;
                        }
                    } else {
                        // Iterating through the startIndices, if the index falls within selectionStart and selectionEnd, remove an indent from that row
                        var	startIndices = tabIndent.findStartIndices(this),
                            l = startIndices.length,
                            newStart = undefined,
                            newEnd = undefined,
                            affectedRows = 0;

                        while(l--) {
                            var lowerBound = startIndices[l];
                            if (startIndices[l+1] && currentStart != startIndices[l+1]) lowerBound = startIndices[l+1];

                            if (lowerBound >= currentStart && startIndices[l] < currentEnd) {
                                if (this.value.substr(startIndices[l], 1) == '\t') {
                                    // Remove a tab
                                    this.value = this.value.slice(0, startIndices[l]) + this.value.slice(startIndices[l] + 1);
                                    affectedRows++;
                                } else {}	// Do nothing

                                newStart = startIndices[l];
                                if (!newEnd) newEnd = (startIndices[l+1] ? startIndices[l+1] - 1 : 'end');
                            }
                        }

                        this.selectionStart = newStart;
                        this.selectionEnd = (newEnd !== 'end' ? newEnd - affectedRows : this.value.length);
                    }
                }
            } else if (e.keyCode == 27) {
                tabIndent.events.disable(e);
            }
        },
        disable: function(e) {
            var events = this;

            // Temporarily suspend the main tabIndent event
            tabIndent.remove(e.target);

            // ... but re-add it upon re-focus
            tabIndent.render(e.target);
        }
    },
    render: function(el) {
        var self = this;

        if (el.nodeName === 'TEXTAREA') {
            $(el).bind('focus', function f() {
                var delayedRefocus = setTimeout(function() {
                    $(el).bind('keydown', self.events.keydown);
                    $(el).addClass('tabIndent');
                    $(el).unbind('focus');
                }, 50);

                // If they were just tabbing through the input, let them continue unimpeded
                $(el).bind('blur', function b() {
                    clearTimeout(delayedRefocus);
                    $(el).unbind('blur');
                });
            });

            $(el).bind('blur', function b(e) {
                self.events.disable(e);
            });
        }
    },
    remove: function(el) {
        if (el.nodeName === 'TEXTAREA') {
            if ($(el).hasClass('tabIndent-rendered')) {
                $(el).remove('tabIndent-rendered');
                $(el).addClass('tabIndent');
            }
        }
    },
    isMultiLine: function(el) {
        // Extract the selection
        var	snippet = $(el).val().slice(el.selectionStart, el.selectionEnd),
            nlRegex = new RegExp(/\n/);

        if (nlRegex.test(snippet)) {
            return true;
        } else {
            return false;
        }

    },
    findStartIndices: function(el) {
        var	text = el.value,
            startIndices = [],
            offset = 0;

        while(text.match(/\n/) && text.match(/\n/).length > 0) {
            offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
            var lineEnd = text.search("\n");
            startIndices.push(lineEnd + offset + 1);
            text = text.substring(lineEnd + 1);
        }
        startIndices.unshift(0);

        return startIndices;
    }
}
