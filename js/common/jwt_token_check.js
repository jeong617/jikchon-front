/** 
 * (페이지 이동 시) 초기 토큰 확인 함수
 * 
 * 로컬 스토리지에 토큰이 없으면 로그인 페이지로 이동합니다.
 * valid 여부는 확인하지 않습니다.
 * 
 * @returns {boolean} true: 토큰이 존재함
 * @returns {boolean} false: 토큰이 존재하지 않음
 */
function checkTokenExistence() {
  return localStorage.getItem("access_token") !== null ? true : false;
}

/**
 * 유저 역할 구별(검사) 함수
 * 
 * localStorage의 유저 역할을 확인하고, 반환합니다.
 * 
 * @returns {string} seller: 판매자
 * @returns {string} customer: 구매자
 */
function checkUserRole() {
  return localStorage.getItem("user_role");
}

/** 
 * 토큰 유효성 검사 함수
 * 
 * 토큰의 유효성을 검사하고, 유효하지 않으면 리프레시 토큰으로 갱신합니다.
 * 
 * @param {Promise} response: fetch() 함수의 반환값
 * @returns none
*/
function checkTokenValid(response) {
  if (response.status === 401) {
    fetch('https://api.example.com/refresh', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("access_token", response.data.accessToken);
    });
  }
}

/**
 * 로그아웃 함수
 * 
 * 로컬 스토리지의 토큰을 삭제하고, 메인 페이지로 이동합니다.
 */
function logOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
  window.alert("로그아웃 되었습니다.");
  window.location.href = "./main-home1.html";
}



// !!! 예시 - 장바구니 조회 함수
function inquireCart() {
  fetch("https://api.example.com/cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    },
  })
  .then(checkTokenValid(response))
  .then(response => response.json())
  .then(response => {
    console.log(response.data); // 가져온 데이터 처리
  });
}


// 아래 세 함수만 필요에 따라 타 파일에서 import 후 사용하면 됩니다.
export default {checkTokenExistence, checkTokenValid, checkUserRole, logOut};