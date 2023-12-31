import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdClose, MdArrowBack } from 'react-icons/md';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/CheckBox';
import { HOST } from '../../components/Variable';

import './SignUp.scss';

const SignUp = props => {
  const { handleSignUpModalOpen, handleModalopen } = props;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [age, setAge] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = event => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const saveUserFirstName = e => {
    setFirstName(e.target.value);
  };
  const saveUserLastName = e => {
    setLastName(e.target.value);
  };

  const saveUserEmail = e => {
    setEmail(e.target.value);
  };

  const saveUserPassword = e => {
    setPassword(e.target.value);
  };

  const saveUserCheckPassword = e => {
    setCheckPassword(e.target.value);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    if (firstName === '' || firstName.length > 2) {
      alert('성을 두글자 이내로 작성해주세요');
      return;
    } else if (lastName === '' || lastName.length > 5) {
      alert('이름을 다섯글자 이내로 작성해주세요');
      return;
    } else if (!(email.includes('@') && email.includes('.')) || email === '') {
      alert('이메일 형식이 틀렸습니다 (예:example123@naver.com)');
      return;
    } else if (password === '' || password.length < 5) {
      alert('비밀번호는 숫자, 소문자, 대문자, 특수문자, 5자 이상으로 해주세요');
      return;
    } else if ((age && termsOfUse && privacy) === false) {
      alert('필수사항을 체크해주세요');
      return;
    } else if (!(password === checkPassword)) {
      alert('비밀번호와 비밀번호확인이 다릅니다');
      return;
    }
    fetch(`${HOST}/users/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'USER_CREATED') {
          alert('회원가입이 완료되었습니다');
          goToLogin();
        } else if (data.message === 'EXISTING_USER') {
          alert('이미 존재하는 이메일입니다');
        } else if (data.message === 'PASSWORD_NO_CHARACTERS') {
          alert(
            '비밀번호는 숫자, 소문자, 대문자, 특수문자, 5자 이상으로 해주세요',
          );
        } else if (data.message === 'INVALID_EMAIL') {
          alert('이메일이 너무 짧습니다');
        }
      });
  };

  return (
    <div className="signUp">
      <div className="signUpModal">
        <div className="signUpScreen">
          <div className="leftArrowAndBackButton">
            <MdArrowBack
              className="goBackButton"
              onClick={handleSignUpModalOpen}
            />
            <MdClose className="closeButton" onClick={handleModalopen} />
          </div>
          <div className="signUpContent">
            <div className="signUpLetter">
              <h1>회원가입</h1>
            </div>
            <div className="inputAndButtonWrappper">
              <div className="nameWrapper">
                <Input
                  className="firstNameInput"
                  type="text"
                  placeholder="성"
                  value={firstName}
                  onChange={saveUserFirstName}
                />
                <Input
                  className="lastNameInput"
                  type="text"
                  placeholder="이름"
                  value={lastName}
                  onChange={saveUserLastName}
                />
              </div>
              <div className="emailWrapper">
                <Input
                  className="emailInput"
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={saveUserEmail}
                />
              </div>
              <div className="passwordWrapper">
                <Input
                  className="passwordInput"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  value={password}
                  onChange={saveUserPassword}
                />
                <button className="viewPassword" onClick={handleShowPassword}>
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
              <div className="passwordCheckWrapper">
                <Input
                  className="passwordCheckInput"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={checkPassword}
                  onChange={saveUserCheckPassword}
                />
              </div>
              <CheckBox checked={age} onChange={setAge}>
                본인은 만 14세 이상입니다 (필수)
              </CheckBox>
              <CheckBox checked={termsOfUse} onChange={setTermsOfUse}>
                이용 약관에 동의합니다 (필수)
              </CheckBox>
              <div className="scrollWrapper">
                <div className="scrollLetterWrapper">
                  <p>
                    <strong>이솝 온라인 몰 서비스 이용약관</strong>
                  </p>
                  <p>
                    이솝 온라인(이하'본 사이트')에 방문해주신 고객님께
                    감사드립니다.
                  </p>
                  <p>
                    이 약관은 이솝 코리아 유한회사가 운영하는 사이트에서
                    제공하는 인터넷 관련 서비스를 이용함에 있어 온라인 쇼핑몰과
                    이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                  <p>
                    이솝 코리아 유한회사 (이하 '회사')는 아래의 약관,
                    개인정보처리방침 및 고객 서비스와 특정 기능, 게시물 또는
                    홍보와 관련하여 본 사이트 전체에서 제시하는 여타 조건과
                    정책에 따라, 이용자에게 본 사이트상 컨텐츠와 서비스를
                    제공합니다. 회원가입을 하시면 온라인 쇼핑 서비스와 함께
                    이솝의 신제품 소식, 온/오프라인의 다양한 이벤트 정보를
                    확인하실 수 있습니다.
                  </p>
                </div>
              </div>
              <CheckBox checked={privacy} onChange={setPrivacy}>
                개인정보 수집 및 이용조건에 동의합니다 (필수)
              </CheckBox>
              <div className="scrollWrapper">
                <div className="scrollLetterWrapper">
                  <p>개인정보수집항목:</p>
                  <p>
                    a) 성명, 이메일 주소, 전화번호, 주소, 기타 귀하가 당사
                    웹사이트에서 구매 시 알려주신 개인정보
                  </p>
                  <p>b) 결제 정보 및 구매 정보</p>
                  <p>
                    c) 구매 내역, 서비스 이용 기록 및 웹사이트 활동 내역 (예:
                    홈페이지에서 최근 본 내용 추적), 고객 클레임 및 분쟁 해결에
                    관한 정보.
                  </p>
                </div>
              </div>
              <CheckBox checked={marketing} onChange={setMarketing}>
                마케팅 정보 수신에 동의합니다 (선택)
              </CheckBox>
              <div className="scrollWrapper">
                <div className="scrollLetterWrapper">
                  <p>마케팅 정보 수신 동의 (선택):</p>
                  <p>
                    이솝은 고객님의 개인정보를 사용하여 이솝의 제품, 서비스 및
                    홍보 행사 관련 정보를 마케팅 목적으로, 고객님이 동의
                    해지하시기 전까지, 고객님께 보내 드립니다. 개인정보 수집 및
                    이용 그리고 마케팅 정보 수령에 동의하지 않으셔도 됩니다.
                    그러한 경우, 고객님께서는 마케팅 정보를 수령하실 수
                    없습니다.
                  </p>
                </div>
              </div>
              <div className="signUpButtonWrapper">
                <button className="signUpBtn" onClick={handleSignUp}>
                  회원가입
                </button>
              </div>
            </div>
            <button className="alreadyHaveId" onClick={goToLogin}>
              이미 이솝 계정을 가지고 계십니까?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
