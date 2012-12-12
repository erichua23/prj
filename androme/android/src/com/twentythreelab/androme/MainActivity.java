package com.twentythreelab.androme;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.gesture.GestureOverlayView;
import android.gesture.GestureOverlayView.OnGestureListener;
import android.graphics.Point;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MotionEvent;
import android.widget.ImageButton;

public class MainActivity extends Activity {
	private final String TAG = "MainActivity";
	private Point start = new Point();
	SocketIO socket;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		/**
		ImageButton imgbt=(ImageButton)findViewById(R.id.qr_btn);
		imgbt.getBackground().setAlpha(0);
		*/
		//new DownloadFilesTask().execute();

		GestureOverlayView gestureOverlayView = (GestureOverlayView) findViewById(R.id.gestureOverlayView);
		try {
			socket = new SocketIO("http://192.168.1.103:80/");
			socket.connect(new IOCallback() {
				@Override
				public void onMessage(JSONObject json, IOAcknowledge ack) {
					try {
						Log.d("WebSocket", json.toString());
						System.out.println("Server said:" + json.toString(2));
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}

				@Override
				public void onMessage(String data, IOAcknowledge ack) {
					System.out.println("Server said: " + data);
				}

				@Override
				public void onError(SocketIOException socketIOException) {
					System.out.println("an Error occured");
					socketIOException.printStackTrace();
				}

				@Override
				public void onDisconnect() {
					System.out.println("Connection terminated.");
				}

				@Override
				public void onConnect() {
					System.out.println("Connection established");
				}

				@Override
				public void on(String event, IOAcknowledge ack, Object... args) {
					System.out
							.println("Server triggered event '" + event + "'");
				}
			});

			// This line is cached until the connection is establisched.
			socket.send("Hello Server!");
		} catch (MalformedURLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		gestureOverlayView.addOnGestureListener(new OnGestureListener() {
			@Override
			public void onGesture(GestureOverlayView arg0, MotionEvent arg1) {
				// TODO Auto-generated method stub

			}

			@Override
			public void onGestureCancelled(GestureOverlayView overlay,
					MotionEvent event) {
				// TODO Auto-generated method stub

			}

			@Override
			public void onGestureEnded(GestureOverlayView overlay,
					MotionEvent event) {
				// TODO Auto-generated method stub
				float endX = event.getX();
				float endY = event.getY();
				if (Math.abs(endX - start.x) > Math.abs(endY - start.y)) {
					if (endX > start.x) {
						// right
						Log.d(TAG, "right");
						socket.emit("right", new Object());
					} else if (endX < start.x) {
						// left
						socket.emit("left", new Object());
					}
				} else {
					if (endY > start.y) {
						// down
						socket.emit("down", new Object());
					} else if (endY < start.y) {
						// up
						socket.emit("up", new Object());
					}
				}
			}

			@Override
			public void onGestureStarted(GestureOverlayView overlay,
					MotionEvent event) {
				// TODO Auto-generated method stub
				start.x = (int) event.getX();
				start.y = (int) event.getY();
			}

		});
	}

	private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
		protected Long doInBackground(URL... urls) {
			HttpParams httpParams = new BasicHttpParams();
			HttpConnectionParams.setConnectionTimeout(httpParams, 30000);
			HttpConnectionParams.setSoTimeout(httpParams, 30000);

			HttpClient httpClient = new DefaultHttpClient(httpParams);
			// GET
			HttpGet httpGet = new HttpGet("http://www.qq.com");
			try {
				HttpResponse response = httpClient.execute(httpGet);
				System.out.println(response.getStatusLine().getStatusCode());
				String htmlContent = "";
				String token = null;
				BufferedReader br = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
				while ((token = br.readLine()) != null) {
					System.out.println(token);
					htmlContent += token;
				}
				System.out.println(htmlContent);
				if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
					Log.i("GET", "Bad Request!");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

			return null;
		}

		protected void onProgressUpdate(Integer... progress) {
		}

		protected void onPostExecute(Long result) {
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}
}
