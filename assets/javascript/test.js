var str1 = "abcdefgh";
var pattern = "bcd";
var str2 = "";
if (str1.indexOf(pattern) >= 0) {
  str2 = str1.substr(str1.indexOf(pattern) + pattern.length, str1.length);
  console.log("str2: " + str2);
  str3 = str1.substr(0, str1.indexOf(pattern));
  console.log("str3: " + str3);
}
