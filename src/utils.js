export default function parseSRT(content) {
  let lrcList = content.split("\n");
  const pattern = /(\d{2}:\d{2}:\d{2},\d{3})(\S+?\d{2}:\d{2}:\d{2},\d{3}\S+)/;
  let filterList = lrcList.filter((item) => {
    return item.match(pattern);
  });

  const charPattern = /(\d{2}:\d{2}:\d{2},\d{3})([^0-9:]+)(?=\d{2}:\d{2}:\d{2},\d{3}|$)/g;
  const timePattern = /(\d{2}:\d{2}:\d{2},\d{3})/g;
  lrcList = filterList.map(item => {
    const lrcItme = {};
    lrcItme.times = [];
    lrcItme.contentList = [];
    lrcItme.content = "";
    let result;
    while ((result = charPattern.exec(item)) !== null) {
      lrcItme.contentList.push(result[2]);
      lrcItme.content += result[2];
    }
    lrcItme.times = item.match(timePattern);
    lrcItme.times = lrcItme.times.map((timeString, index) => {
      let timeParts = timeString.split(":");
      const secondsAndMs = timeParts[2].split(",");
      const hoursInMs = parseInt(timeParts[0]) * 60 * 60 * 1000;
      const minutesInMs = parseInt(timeParts[1]) * 60 * 1000;
      const secondsInMs = parseInt(secondsAndMs[0]) * 1000;
      const ms = parseInt(secondsAndMs[1]);
      return hoursInMs + minutesInMs + secondsInMs + ms;
    });
    return lrcItme;
  });
  return lrcList;
}
