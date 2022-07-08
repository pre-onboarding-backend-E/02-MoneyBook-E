export const ErrorType = {
  invalideUser: { code: 400, msg: '유효한 사용자가 아닙니다!' },
  userExists: { code: 400, msg: '이미 존재하는 유저입니다!' },
  userNotFound: { code: 400, msg: '존재하지 않는 유저입니다!' },
  accountNotFound: { code: 400, msg: '존재하지 않는 가계부입니다!' },
  emailExists: { code: 409, msg: '해당 이메일은 이미 사용중입니다!' },
};
//참고
// - /users/signup
//     - 회원가입 요청
//     - 성공 - 201. Created success(회원가입 요청이 성공했습니다.)
//     - 비밀번호 혹은 이메일 형식이 유효하지 않습니다 ⇒ 400 Bad Request
//     - 비밀번호와 confirmPassword가 일치하지않습니다 ⇒ 400 Bad Request
//     - 이미 사용하는 이메일입니다. ⇒ 409 Conflict

// - users/login
//     - 로그인 요청
//     - 성공 - 201. 로그인 요청 성공했습니다. (유저 데이터)
//     - 이메일과 password가 유효하지 않습니다. ⇒ 400 Bad Request

// - users/logout
//     - 로그아웃 요청
//     - 성공 - 201. 로그아웃 요청 성공했습니다.
//     - 401 Unauthorized - 로그인 상태가 아닐 때 로그아웃 요청을 보낼 시

// - users/refresh
//     - 성공 - 201. accessToken 재발급 요청 성공했습니다.
//     - 401 Unauthorized - 로그인 상태가 아닐 때 로그아웃 요청을 보낼 시
