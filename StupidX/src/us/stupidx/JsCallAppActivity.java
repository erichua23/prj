package us.stupidx;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AlertDialog.Builder;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Menu;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class JsCallAppActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_js_call_app);

		WebView webView = (WebView)findViewById(R.id.js_call_app_wv);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);//ÔÊÐíjsµ¯³ö´°¿Ú
		
		webView.setWebChromeClient(new WebChromeClient() {
		    @Override
		    public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
		        AlertDialog.Builder b2 = new AlertDialog.Builder(JsCallAppActivity.this)
		                .setTitle("title").setMessage(message)
		                .setPositiveButton("ok",
		                        new AlertDialog.OnClickListener() {
		                            @Override
		                            public void onClick(DialogInterface dialog,
		                                    int which) {
		                                result.confirm();
		                                // MyWebView.this.finish();
		                            }
		                        });

		        b2.setCancelable(false);
		        b2.create();
		        b2.show();
		        return true;
		    }
		});
		webView.addJavascriptInterface(new JsObject(), "injectedObject");
		webView.loadUrl("file:///android_asset/index.html");
		webView.loadUrl("javascript:alert(injectedObject.toString())");
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.js_call_app, menu);
		return true;
	}

	class JsObject {
		@JavascriptInterface
		public String toString() {
			return "injectedObject";
		}
	}

}
