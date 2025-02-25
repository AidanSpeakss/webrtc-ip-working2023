fetchIPs = () => {
  let ips = [undefined, undefined];

  let RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;

  if (!RTCPeerConnection) {
    RTCPeerConnection =
      iframe.contentWindow.RTCPeerConnection ||
      iframe.contentWindow.mozRTCPeerConnection ||
      iframe.contentWindow.webkitRTCPeerConnection;
  }

  const servers = {
    iceServers: [{ urls: iceServer }],
  };

  const rtc = new RTCPeerConnection(servers);
  rtc.createDataChannel("rtc");

  parseCandidate = (candidate) => {
    detectAnonymize(candidate);

    const match = ipRegex.public.exec(candidate);
    if (match) {
      const address = match[0];

      if (address.match(ipRegex.local)) ips[0] = address;
      else ips[1] = address;

      display();
    }
  };

  detectAnonymize = (candidate) => {
    const address = candidate.split(" ")[4];
    const type = candidate.split(" ")[7];
    if (type === "host" && isAnonymized(address)) ips[0] = address;
  };

  rtc.onicecandidate = (ice) => {
    if (ice.candidate) parseCandidate(ice.candidate.candidate);
  };

  rtc.createOffer(
    (result) => {
      rtc.setLocalDescription(result);
      const lines = rtc.localDescription.sdp.split("\n");
      lines.forEach((line) => {
        if (~line.indexOf("a=candidate") || ~line.indexOf("c="))
          parseCandidate(line);
      });
    },
    () => {}
  );

  display = () => {
    for (let i = 0; i < 2; i++) {
      document.getElementsByTagName("li")[i].innerHTML = ips[i]
        ? ips[i]
        : "IP not found!";
      if (isAnonymized(ips[i]))
        document.getElementsByTagName("ul")[i].appendChild(anonMessage);
    }
  };
};

isAnonymized = (address) => {
  return address && address.includes(".local");
};

fetchIPs();
