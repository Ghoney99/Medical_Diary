// SDK 초기화
Kakao.init('42cd96a0da9b1e79c98fcbab4a817360');

// 사용자 정보를 저장할 전역 변수 선언
var loginUser = {};

// 카카오 로그인 함수
function loginWithKakao() {
  Kakao.Auth.login({
    success: function(authObj) {
      // 로그인에 성공하면 사용자 정보를 가져옵니다.
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(response) {
          var username = response.properties.nickname; // 사용자 이름
          var userId = response.id; // 사용자 ID

          // 사용자 정보를 전역 변수 loginUser에 저장합니다.
          loginUser = {
            username: username,
            userId: userId,
          }

          //localStorage로 로그인정보 저장
          localStorage.setItem('loginUser', JSON.stringify(loginUser));

          // 사용자 이름, ID, 프로필 사진을 표시합니다.
          var usernameElement = document.getElementById('username');
          var userIdElement = document.getElementById('userid');

          usernameElement.textContent = '사용자 이름: ' + username;
          userIdElement.textContent = '사용자 ID: ' + userId;
        },
        fail: function(error) {
          console.log(error);
        }
      });
    },
    fail: function(error) {
      console.log(error);
    }
  });
}
// 로그아웃 함수
function logoutFromKakao() {
  if (Kakao.Auth.getAccessToken()) {
    // 카카오에 로그인되어 있는 경우 로그아웃합니다.
    Kakao.Auth.logout(function() {
      alert('로그아웃 되었습니다.');
      // 사용자 정보를 초기화합니다.
      var usernameElement = document.getElementById('username');
      var userIdElement = document.getElementById('userid');


      if (usernameElement) usernameElement.textContent = 'guest';
      if (userIdElement) userIdElement.textContent = '';


      // localStorage의 사용자 정보도 제거합니다.
      localStorage.removeItem('loginUser');
      // loginUser도 초기화합니다.
      loginUser = {};

      // 페이지를 새로고침합니다.
      location.reload();
    });
  } else {
    alert('로그인되어 있지 않습니다.');
  }
}
