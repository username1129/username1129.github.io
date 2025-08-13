var page_num = 1n;

function generate_small_num(pnum){
  var name = '〇一二三四五六七八九';
  var ret = '';
  if (pnum / 1000n !== 0n)
    ret += name[pnum / 1000n] + '千';
  if (pnum / 100n % 10n !== 0n)
    ret += name[pnum / 100n % 10n] + '百';
  if (pnum / 10n % 10n !== 0n)
    ret += name[pnum / 10n % 10n] + '十';
  if (pnum % 10n != 0n)
    ret += name[pnum % 10n];
  return ret;
}
function generate_num(pnum) {
  var name = ['','亿','兆','京','垓','秭','穰','沟','涧','正','载','极', '恒河沙'];
  var ret = '';
  var lis = [];
  while (pnum > 0n) {
    lis.push(pnum % 10n ** 8n);
    pnum /= 10n ** 8n;
  }
  for (let i = lis.length - 1; i >= 0; i--) {
    if (lis[i] !== 0n) {
      if (lis[i] / 10000n != 0n)
        ret += generate_small_num(lis[i] / 10000n) + '万';
      if (lis[i] % 10000n != 0n)
        ret += generate_small_num(lis[i] % 10000n);
      ret += name[i];
    }
  }
  return ret;
}
function calculate_title(pnum) {
  return '诗云其' + generate_num(pnum);
}
function calculate_content(pnum) {
  var poem = '';
  var foo = pnum - 1n;
  for (let i = 0; i < 20; i++) {
    if (i == 5 || i == 15)
      poem = '，<br>' + poem;
    if (i == 0 || i == 10)
      poem = '。<br>' + poem;
    poem = chrlist[foo % BigInt(chrlist.length)] + poem;
    foo /= BigInt(chrlist.length);
  }
  return poem;
}
function display(){
  document.getElementById("poem_title").innerHTML = calculate_title(page_num);
  document.getElementById("poem_content").innerHTML = calculate_content(page_num);
  document.getElementById("current_page").innerHTML = '第 ' + page_num + ' 页';
}
function PgUp(){
  if (page_num > 1n)
    page_num -= 1n;
  display();
}
function PgDn(){
  if (page_num < BigInt(chrlist.length) ** 20n)
  page_num += 1n;
  display();
}
