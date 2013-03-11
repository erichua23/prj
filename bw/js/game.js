(function(){
    window.app = {};
    app.config = {
        board_size: 10,
        grid_size: 50,
        left_top_x: 50,
        left_top_y: 50,
        fps: 24,

        chess_size: 15
    };


    var canvas = app.canvas = document.getElementById('game_board');
    var cxt = app.cxt = canvas.getContext('2d');

    app.game_status = [];


    app.init = function () {
        for (var i = 0; i < app.config.board_size; i++) {
            var row = [];
            for (var j = 0; j < app.config.board_size; j++) {
                row[j] = -1;
            }
            app.game_status[i] = row;
        }
    };
    app.chess_color = 1;

    app.get_chess_color = function (chess_type) {
        if (chess_type === 1) {
            return "#FF0000";
        } else {
            return "#00FF00";
        }
    };

    app.toggle_chess = function (){
        app.chess_color = app.chess_color === 1 ? 0 : 1;
        
        setTimeout(function () {
            cxt.fillStyle = app.get_chess_color(app.chess_color);
            cxt.beginPath();

            cxt.arc(
                    700,
                    100,
                    15,
                    0,
                    Math.PI*2,
                    true);
            cxt.fill();
            cxt.closePath();
        }, 200);
    }

    app.update_player_info = function () {
        cxt.fillStyle = "#000";
        cxt.font = '16pt Calibri';
        cxt.lineWidth = 2;
        cxt.beginPath();
        cxt.strokeText('当前用户', 600, 110);
        cxt.closePath();

        var score = [0, 0];
        for (var i = 0; i < app.config.board_size; i++) {
            for (var j = 0; j < app.config.board_size; j++) {
                if (app.game_status[i][j] === 0) {
                    score[0] += 1;
                } else if (app.game_status[i][j] === 1) {
                    score[1] += 1;
                }
            }
        }

        cxt.fillStyle = app.get_chess_color(1);
        cxt.beginPath();
        cxt.arc(
                600,
                200,
                15,
                0,
                Math.PI*2,
                true);
        cxt.fill();
        cxt.strokeText(score[1], 650, 205);
        cxt.closePath();

        cxt.fillStyle = app.get_chess_color(0);
        cxt.beginPath();

        cxt.arc(
                600,
                250,
                15,
                0,
                Math.PI*2,
                true);
        cxt.fill();
        cxt.strokeText(score[0], 650, 255);
        cxt.closePath();
    };

    app.update = function () {
        console.log('update');
        app.cxt.clearRect(0, 0, 800, 600);
        var game_board = new app.GameBoard(app.config.board_size, cxt);
    };

    app.GameBoard = function (size, cxt) {
        var grid_size = app.config.grid_size;
        var len = grid_size * size;

        var left_top_x = app.config.left_top_x;
        var left_top_y = app.config.left_top_y;

        cxt.strokeStyle = "#999";
        cxt.beginPath();
        for (var i = size; i >= 0; i--) {
            cxt.moveTo(left_top_x + grid_size * (size - i), left_top_y); 
            cxt.lineTo(left_top_x + grid_size * (size - i), left_top_y + len);

            cxt.moveTo(left_top_x, left_top_y + grid_size * (size - i)); 
            cxt.lineTo(left_top_x + len, left_top_y + grid_size * (size - i));
        }
        cxt.stroke();
        cxt.closePath();
    };

    app.update_cursor = function () {
        var pos_x = app.current_pos_x, pos_y = app.current_pos_y;
        var cxt = app.cxt;
        var pos_left_top_x = pos_x * app.config.grid_size + app.config.left_top_x;
        var pos_left_top_y = pos_y * app.config.grid_size + app.config.left_top_y;

        cxt.strokeStyle = "blue";
        cxt.beginPath();
        // 左上角
        cxt.moveTo(pos_left_top_x + app.config.grid_size/3, pos_left_top_y);
        cxt.lineTo(pos_left_top_x, pos_left_top_y);
        cxt.lineTo(pos_left_top_x, pos_left_top_y + app.config.grid_size/3);

        // 右上角
        cxt.moveTo(pos_left_top_x + app.config.grid_size * 2 / 3, pos_left_top_y);
        cxt.lineTo(pos_left_top_x + app.config.grid_size, pos_left_top_y);
        cxt.lineTo(pos_left_top_x + app.config.grid_size, pos_left_top_y + app.config.grid_size / 3);

        // 左下角
        cxt.moveTo(pos_left_top_x + app.config.grid_size / 3, pos_left_top_y + app.config.grid_size);
        cxt.lineTo(pos_left_top_x, pos_left_top_y + app.config.grid_size);
        cxt.lineTo(pos_left_top_x, pos_left_top_y + app.config.grid_size * 2 / 3);

        // 右下角
        cxt.moveTo(pos_left_top_x + app.config.grid_size * 2 / 3, pos_left_top_y + app.config.grid_size);
        cxt.lineTo(pos_left_top_x + app.config.grid_size, pos_left_top_y + app.config.grid_size);
        cxt.lineTo(pos_left_top_x + app.config.grid_size, pos_left_top_y + app.config.grid_size * 2 / 3);

        cxt.stroke();
        cxt.closePath();
    }

    app.draw_chess = function (pos_x, pos_y, chess_type, cxt) {
        if (app.game_status[pos_x][pos_y] === -1) {
            return;
        }
        cxt.fillStyle = app.get_chess_color(chess_type);
         
        cxt.beginPath();
        
        var pos_left_top_x = pos_x * app.config.grid_size + app.config.left_top_x;
        var pos_left_top_y = pos_y * app.config.grid_size + app.config.left_top_y;

        cxt.arc(
                0.5 * app.config.grid_size + pos_left_top_x,
                0.5 * app.config.grid_size + pos_left_top_y,
                15,
                0,
                Math.PI*2,
                true);
        cxt.fill();
        cxt.closePath();
    };

    app.update_chess = function () {
        for (var i = 0; i < app.config.board_size; i++) {
            for (var j = 0; j < app.config.board_size; j++) {
                if (app.game_status[i][j] !== -1) {
                    app.draw_chess(i, j, app.game_status[i][j], app.cxt);
                }
            }
        }
    };

    app.battle = function (pos_x, pos_y, chess_type) {
        console.log('battle');
        var to_kill = [];
        var game_status = app.game_status;
        // 向左边
        var i;
        for (i = pos_x - 1; i >= 0; i--) {
            // 遇到空位
            if (game_status[i][pos_y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[i][pos_y] === chess_type) {
                for (var j = i+1; j < pos_x; j++) {
                    app.game_status[j][pos_y] = chess_type;
                }
                break;
            }
        }

        // 向右
        var i;
        for (i = pos_x + 1; i < app.config.board_size; i++) {
            // 遇到空位
            if (game_status[i][pos_y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[i][pos_y] === chess_type) {
                for (var j = i-1; j > pos_x; j--) {
                    app.game_status[j][pos_y] = chess_type;
                }
                break;
            }
        }

        // 向上
        var i;
        for (i = pos_y - 1; i >= 0; i--) {
            // 遇到空位
            if (game_status[pos_x][i] === -1) {
                break;
            }

            // 遇到自己的棋子
                console.log('up: ', i);
                console.log('X: ', pos_x);
                console.log('Y: ', pos_y);
            if (game_status[pos_x][i] === chess_type) {
                console.log('mine');
                for (var j = i + 1; j < pos_y; j++) {
                    app.game_status[pos_x][j] = chess_type;
                }
                break;
            }
        }

        // 向下
        var i;
        for (i = pos_y + 1; i < app.config.board_size; i++) {
            // 遇到空位
            if (game_status[pos_x][i] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[pos_x][i] === chess_type) {
                for (var j = i - 1; j > pos_y; j--) {
                    app.game_status[pos_x][j] = chess_type;
                }
                break;
            }
        }

        // 左下
        // var i = (app.config.board_size - pos_y) > pos_x ? pos_x : (app.config.board_size - pos_y);
        var x = pos_x - 1, y = pos_y + 1;
        for (; x >= 0 && y < app.config.board_size; x--, y++) {
            // 遇到空位
            if (game_status[x][y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[x][y] === chess_type) {
                while (x < pos_x) {
                    console.log('kill');
                    app.game_status[x++][y--] = chess_type;
                }
                break;
            }
        }

        // 右下
        var x = pos_x + 1, y = pos_y + 1;
        for (; x < app.config.board_size&& y < app.config.board_size; x++, y++) {
            // 遇到空位
            if (game_status[x][y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[x][y] === chess_type) {
                while (x > pos_x) {
                    app.game_status[x--][y--] = chess_type;
                }
                break;
            }
        }

        // 右上
        var x = pos_x + 1, y = pos_y - 1;
        for (; x < app.config.board_size && y >= 0; x++, y--) {
            // 遇到空位
            if (game_status[x][y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[x][y] === chess_type) {
                while (x > pos_x) {
                    app.game_status[x--][y++] = chess_type;
                }
                break;
            }
        }

        // 左上
        var x = pos_x - 1, y = pos_y - 1;
        for (; x >= 0 && y >= 0; x--, y--) {
            // 遇到空位
            if (game_status[x][y] === -1) {
                break;
            }

            // 遇到自己的棋子
            if (game_status[x][y] === chess_type) {
                while (x < pos_x) {
                    app.game_status[x++][y++] = chess_type;
                }
                break;
            }
        }
    }

    app.Chess = function (pos_x, pos_y, size, cxt) {
        if (app.game_status[pos_x][pos_y] !== -1) {
            return;
        }

        app.game_status[pos_x][pos_y] = app.chess_color;

        // 设置最后一个放棋子的地方
        app.current_pos_x = pos_x;
        app.current_pos_y = pos_y;

        console.log(app.game_status);

        // 重绘棋盘
        app.update();

        // 处理吃和被吃的逻辑
        app.battle(pos_x, pos_y, app.chess_color);

        // 更新棋子
        app.update_chess();

        // 更新光标
        app.update_cursor();

        app.update_player_info();

        app.toggle_chess();
    };

    app.event_delegate = function () {
        app.canvas.onclick = function (e) {
            var left_x = app.config.left_top_x;
            var right_x = app.config.left_top_x + app.config.grid_size * app.config.board_size;

            var top_y = app.config.left_top_y;
            var bottom_y = app.config.left_top_y + app.config.grid_size * app.config.board_size;

            if (e.offsetX >= right_x || e.offsetX <= left_x
                || e.offsetY <= top_y || e.offsetY >= bottom_y) {
                // 界外事件不处理
                return ;
            }
            console.log(e);
            console.log(e.offsetX);
            console.log(e.offsetY);

            var pos_x = Math.floor((e.offsetX - app.config.left_top_x) / app.config.grid_size);
            var pos_y = Math.floor((e.offsetY - app.config.left_top_y) / app.config.grid_size);

            console.log("x ", pos_x);
            console.log("y ", pos_y);
            
            app.Chess(pos_x, pos_y, app.config.chess_size, app.cxt);
        }
    };

    // setInterval(function () {
    app.init();
    app.update();
    app.event_delegate();
    //}, 1);

}());
