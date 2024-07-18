import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginProvider} from "./component/LoginProvider.jsx";
import {Home} from "./page/Home.jsx";
import {BoardWrite} from "./page/board/BoardWrite.jsx";
import BoardList from "./page/board/BoardList.jsx";
import {MemberSignup} from "./page/member/MemberSignup.jsx";
import {MemberLogin} from "./page/member/MemberLogin.jsx";
import {MemberList} from "./page/member/MemberList.jsx";
import {MemberInfo} from "./page/member/MemberInfo.jsx";


const router = createBrowserRouter([
  {path: "/",
    children: [
      { index: true, element: <Home /> },
      {path:"write", element: < BoardWrite/>},
      {path:"list", element: < BoardList/>},
      {path:"signup", element: < MemberSignup/>},
      {path:"login", element: < MemberLogin/>},
      {path:"member/list", element: < MemberList/>},
      {path:"member/:id", element: < MemberInfo/>},
    ]},
])


function App(props) {
  return (
    <ChakraProvider>
      <LoginProvider>
      <RouterProvider router={router}/>
      </LoginProvider>
    </ChakraProvider>
  );
}

export default App;
