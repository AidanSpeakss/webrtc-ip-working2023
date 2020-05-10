# webrtc-ip

A scanner that will scan and identify your public and local IP addresses. This scanner also has the ability to detect anonymized addresses, generated by an experimental feature of Chromium.

## Usage

Visit [https://ip.neerajaggarwal.com](https://ip.neerajaggarwal.com) in your browser to see a working demonstration.

### Settings

To change settings, go to the [`/ipConstants.js`](https://github.com/n3a9/webrtc-ip/blob/master/ipConstants.js) file. There you can:

- Change `debug` flag, which will print progress and data to console
- Change the STUN server (stored in `iceServer`)
- Change the IP recognition regex, stored as a map for the corresponding IP addresses

### Anonymized IP

An experimental feature of Chromium is to automatically anonymize local IPs exposed by WebRTC. To be able to retrieve the local IP address, you must disable this feature.

Go to [`chrome://flags/#enable-webrtc-hide-local-ips-with-mdns`](chrome://flags/#enable-webrtc-hide-local-ips-with-mdns) in your Chrome browser to disable.

<img width="758" alt="Screen Shot 2019-10-07 at 5 38 47 PM" src="https://user-images.githubusercontent.com/7104017/66354088-6fcabf80-e929-11e9-8cb4-8028538e31d1.png">

### Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No                                                                                                                                                                                                             | Yes                                                                                                                                                                                                              | Yes                                                                                                                                                                                                          | No                                                                                                                                                                                                           | Yes                                                                                                                                                                                                      |

## How It Works

[WebRTC](https://webrtc.org) will attempt to open a [SDP offer](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer). If the offer was successful, it will parse the returned [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription), which contains the configuration of the connection.

There is also a listener for when there is an [icecandidate](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event) event within the connection instance, which will provide the SDP of the ICE candidate.

## Inspiration

Inspired from projects by [diafygi](https://github.com/diafygi/webrtc-ips) and [natevw](https://github.com/natevw/ipcalf).
