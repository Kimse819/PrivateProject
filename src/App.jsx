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
import {MemberEdit} from "./page/member/MemberEdit.jsx";
import {BoardEdit} from "./page/board/BoardEdit.jsx";
import {BoardView} from "./page/board/BoardView.jsx";
import {BoardDetail} from "./page/board/BoardDetail.jsx";
import {PopularMovies} from "./page/movie/PopularMovies .jsx";
import {MovieDetail} from "./page/movie/MovieDetail.jsx";


const router = createBrowserRouter([
  {path: "/",
    children: [
      { index: true, element: <Home /> },
      {path:"write", element: < BoardWrite/>},
      {path:"list", element: < BoardList/>},
      {path:"edit", element: < BoardEdit/>},
      {path:"view", element: < BoardView/>},
      {path:"detail", element: < BoardDetail/>},
      {path:"signup", element: < MemberSignup/>},
      {path:"login", element: < MemberLogin/>},
      {path:"member/list", element: < MemberList/>},
      {path:"member/:id", element: < MemberInfo/>},
      {path: "member/edit/:id", element: <MemberEdit /> },
      {path: "popular", element: <PopularMovies /> },
      {path: "movie/:id", element: <MovieDetail /> },
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
