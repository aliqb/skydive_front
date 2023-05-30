import PasswordLogin from "../../../components/auth/PasswordLogin";
import UsernameLogin from "../../../components/auth/UsermameLogin";
import {useState} from 'react'
export default function LoginPage() {
  const [loginState, setLoginState] = useState<'username'|'password'>('username')
  const [username, setUsername] = useState<string>('');
  function onUserNameSubmit(username: string){
    setUsername(username)
    setLoginState('password')
  }

  function onPasswordSubmit(){
    console.log('submit')
  }

  function onReturnToUsername(){
    setLoginState('username')
  }

  return (
    <>
      {loginState === 'username' ? <UsernameLogin username={username} onUserNameSubmit={onUserNameSubmit} ></UsernameLogin> : <PasswordLogin onPasswordSubmit={onPasswordSubmit} onReturn={onReturnToUsername}></PasswordLogin>}
    </>
  );
}
