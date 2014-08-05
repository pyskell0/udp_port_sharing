process.on('message', function(m, udp) {
  if (m.msg == 'server') {
    console.log(m.i, udp, m.msg)
    udp.on('message', function(msg, rinfo) {
      console.log(msg.toString());
    });
  }
});
