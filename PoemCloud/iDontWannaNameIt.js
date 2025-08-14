var page_num = 1n;
var antichrlist = new Map();
function init_antichrlist(){
  for (var i = 0; i < 97156; i++)
    antichrlist.set(chrlist[i], i);
}
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
function getInputValue(){
  const inputValue = document.getElementById("myInput").value;
  try {
    var val = BigInt(inputValue);
    if (1n <= val && val <= 97156n ** 20n) {
      page_num = val;
      display();
    }
    else
      alert("请输入一个在 1 ~ 97156²⁰ 范围的正整数！");
  } catch (err) {
    alert("请输入一个在 1 ~ 97156²⁰ 范围的正整数！")
  }
}
function max(a,b) {return a>b?a:b;}
function min(a,b) {return a<b?a:b;}
function len(a) {
  var cnt = 0;
  for (var i = 0; i < a.length; ) {
    cnt++;
    if (a[i] >= '\ud800' && a[i] <= '\udbff' && a[i + 1] >= '\udc00' && a[i + 1] <= '\udfff')
      i += 2;
    else
      i += 1;
  }
  return cnt;
}
function search(){
  const poem1 = document.getElementById("poem1").value;
  const poem2 = document.getElementById("poem2").value;
  const poem3 = document.getElementById("poem3").value;
  const poem4 = document.getElementById("poem4").value;
  if (max(max(len(poem1),len(poem2)),max(len(poem3),len(poem4))) != 5 || min(min(len(poem1),len(poem2)),min(len(poem3),len(poem4))) != 5){
    alert("目前只支持五言绝句，请修改。");
    return ;
  }
  const poem = poem1 + poem2 + poem3 + poem4;
  init_antichrlist();
  var ans = 0n;
  for (var i = 0; i < poem.length; ) {
    if (antichrlist.get(poem[i]) == undefined) {
      if (antichrlist.get(poem[i] + poem[i+1]) == undefined) {
        alert('请输入处于标准平面和扩展 A~H 区的中文字符！');
        return ;
      }
      else {
        ans *= 97156n;
        ans += BigInt(antichrlist.get(poem[i] + poem[i + 1]));
        i += 2;
      }
    }
    else {
      ans *= 97156n;
      ans += BigInt(antichrlist.get(poem[i]));
      i++;
    }
  }
  ans += 1n;
  document.getElementById("results").innerHTML = '搜索结果：在诗云的第 ' + ans + ' 页。';
}
