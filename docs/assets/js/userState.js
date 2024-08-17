window.onload = function() {
  // 다른 페이지에서 사용자 정보를 불러옵니다.
  var loginUser = JSON.parse(localStorage.getItem('loginUser'));
  
  // 사용자 정보를 표시할 p 태그를 가져옵니다.
  var userInfoElement = document.getElementById('user-info');
  
  if (loginUser == null) {
    // 로그인하지 않은 사용자인 경우 'guest'를 표시합니다.
    userInfoElement.textContent = 'guest로 입장하셨습니다.';
  } else {
    // 로그인한 사용자인 경우 사용자 이름을 표시합니다.
    userInfoElement.textContent = loginUser.username+"님 안녕하세요!";
  }
};

//loginUser.username <= 사용자 이름
//loginUser.userId <= 사용자 ID