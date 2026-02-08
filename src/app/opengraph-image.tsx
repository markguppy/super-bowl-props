import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Super Bowl LX Prop Bets Challenge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const seahawksLogo =
  "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTQ3LjEgMjMyLjUiIHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjEwNjIiPjxzdHlsZT4uc3Qwe2ZpbGw6I2ZmZn0uc3Qxe2ZpbGw6IzNjNTE3OX0uc3Qye2ZpbGw6IzAzMTgyZn0uc3Qze2ZpbGw6IzRlYWUxN308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny4xIDBTNDUuOSA1My42IDE1LjkgMTEzLjhjLTQ3LjggODIuMiAyNy43IDc2LjcgMjcuNyA3Ni43aDM2MmM5Mi42IDAgNTggNDIgNTggNDJTNTQxLjEgMjEzIDU0Ny4xIDEyM2MtMi41LTYxLTgwLjUtNzEtMTI4LjUtNzcuNS0yMy41LTI5LTcyLTI3LTcyLTI3UzE0NC4xIDE4IDExNy4xIDE4cy00MC0xOC00MC0xOHoiIGlkPSJFYmVuZV8zIi8+PGcgaWQ9IkViZW5lXzIiPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNi42IDExMmMtNDguNSA3Ni41IDIwIDcwIDIwIDcwaDE2M2MtOS41LTE4LTIuNS0xNCA4LjUtNDAuNSAwIDAtMjQuNS0yOS41LTU0LTI5LjVIMjYuNnoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzguNiAxNGwtNDQgODNoMTIyYzU0IDAgNTAuNS00Ni42IDEzMC41LTQ2LjZDMzMwLjUgNTQgMzY3LjYgODkgNDAwLjYgNzkuNWMtMzMuNSAyMS41LTY2LjUtMjAtMTIwLjUtMjAtMzcuNSAwLTc5LjUgNDMuNS03OS41IDQzLjVsMzguNSAzMS41Yy00MyA1MyAwIDQ4LjUgMCA0OC41aDE1Ni41YzEyMi43IDAgNzUuNSA0My41IDc1LjUgNDMuNXM1Ni0zMC41IDY0LjUtMTAwLjVjMC02My41LTEyMC03MC41LTEyMC03MC41cy0xOS0yOS04Mi0yOWgtMjIyYy0yOS41IDAtMzMtMTIuNS0zMy0xMi41eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDUuMSAxNzNzMjEtNDIgNTQtNDJoNjAuNWM0NCAwIDI4LTQ5LjkgNzIuNS01OS0zMy43IDI3LjYgMTIyLTMgNTkgMTA2LjUgMCAwLTY5LjUtMzktMTYzLTM5LTUwIDAtNjUgMzMuNS02NSAzMy41aC0xOHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjgyLjYgMTczczguNS0yNSA1NC41LTI1YzkxLjUgNiAxNDggMzggMTQ4IDM4cy01Ni0yNS41LTE0OC0yOS41Yy0zMi41IDAtNDAuNSAxNi41LTQwLjUgMTYuNWgtMTR6TTI0Ni4xIDk2YzI1LjggMjUuOCA0NSAyNCA0NSAyNGg1Ni41YzI5LjUgMCAzNy41LTIxLjUgMzcuNS0yMS41aC0xNnMtMTAgMTQuNS0yOS41IDE0LjVoLTE5LjVzLTMzLjUgMC0zMy41LTE1LjVjMi42LTEyLjkgOS41LTIyIDkuNS0yMnMtMjEuNS0zLjUtNTAgMjAuNXoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMzE1LjEgNzkuNVMyOTQuOSAxMDMgMzMzLjkgMTAzaDEwLjhjNS42IDAgMTAuNS03IDEwLjUtN2wtNC44LTQuOHMtNC44IDgtOCA4aC01LjJjLTE2LjIgMC0xMS0xNS44LTExLTE1LjhsLTExLjEtMy45eiIvPjwvZz48L3N2Zz4=";

const patriotsLogo =
  "data:image/svg+xml;base64,PHN2ZyAgdmVyc2lvbj0iMS4xIiBpZD0iTkVXX0VOR0xBTkRfUEFUUklPVFMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNTAuMzA1IiBoZWlnaHQ9IjExNi44NDgiCgkgdmlld0JveD0iMCAwIDI1MC4zMDUgMTE2Ljg0OCIgb3ZlcmZsb3c9InZpc2libGUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI1MC4zMDUgMTE2Ljg0OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI0My41NzUsOC44NmMtMjMuMjg1LDYuNzQ4LTQyLjQ2OC05LjMyNC03MS4zNy04LjgzNWwtMC4wNDUtMC4wMDJjMCwwLTM5LjcyMS0xLjE3MS03Ny45MDksMTMuMTczCgkJCUM1NS43ODEsMjYuOTI3LDI5LjQxNywzNy4zNDMsNC41Miw0MC4zM2MtNS44NSwwLjkxNy02LjQsOS44MTQsMC41OTcsMTAuMjc1YzIzLjAyOCwwLjg2OSwzOC41OTQtMC43NTQsNTMuODEzLTMuNzk0CgkJCWMtMi4xNjcsNi42NzksNC41NjgsNy4zNTIsNC42NjgsNy4zNTdjMTguMDc4LDIuMjYzLDMyLjc0NSwwLjQwMyw0Ny4wMzMtMi41NjdjLTMuNjQ3LDQuNDAxLTAuNjk0LDguMzQ2LDIuNDUsOS4wMTEKCQkJYzUzLjkwNyw5LjUzMyw3NC40MzgsMzYuODMzLDk0LjE2Miw1Ni4yMzRjNS41MzUtMC43MjUsMTcuMzU1LTcuNzU1LDEzLjU0Ny0yMS45ODFjMCwwLDEuNDUzLTMuMTU2LDEuNDUxLTUuNjQ2bDYuODEtNC4wNjgKCQkJYzAsMC0yLjg4MS0xNC4zNzEtMy4yMzYtMTYuMDI0YzMuNzM0LTEuOTQ2LDEwLjUxMy01LjMzNywxMC41MTMtNS4zMzdzMTIuMjg0LTQzLjI2MywxMy43NjUtNDguODMyCgkJCUMyNTEuNDE3LDkuOTYxLDI0Ni4yNDEsOC4wODgsMjQzLjU3NSw4Ljg2eiBNNS4yMTgsNDUuNDQ0YzQzLjA2MS01Ljg2Niw3OC42MDEtMjYuMzExLDExNS4xODEtMzQuNTc1CgkJCWMxLjE1LDQuNDY1LDMuMjM1LDEzLjM4LDMuMjM1LDEzLjM4QzcxLjI5OCwzNS4yNiw2NS43NjksNDcuMzczLDUuMjE4LDQ1LjQ0NHogTTYzLjYxMSw0OC45OTQKCQkJYzI4LjYxNC00LjE3Miw0NS45MDctMTQuODMsNjIuMTE2LTE4LjIzNWMwLjk1OCwzLjk5MSwyLjIsOC4wODksMy4wMDcsMTEuMzI0Qzg2LjE4NCw1My42NjMsNjMuNjExLDQ4Ljk5NCw2My42MTEsNDguOTk0egoJCQkgTTIzMS45NjUsNjAuMjIzYy00LjA4NiwxLjk1OC04LjEsNC4wMi0xMi4wNzQsNi4yMThjMS4zODksNS4yOCwyLjE0MywxMC45NjUsMy4zOTUsMTYuMjE3bC02LjIyMywzLjYzMmwwLjAyMSwzLjgyMwoJCQlsLTEuOTU4LDUuMTA5YzIuMjk3LDMuMDQsMS42NTEsNy40NC0wLjE1MSwxMC41MDljLTEuNTE2LDIuNDc2LTMuOTUzLDQuMzM0LTYuMzc1LDUuNzA3YzAsMC0zNC45OTctNDcuNTY0LTk0LjYxNi01NS45MDkKCQkJYzE2Ljc4Mi0yLjY1NiwyMy4xNDQtMTAuMzI4LDUyLjEzLTEwLjI0OWMtMTAuMjkxLTUuNjctMjMuNDY1LTYuMTIzLTM1LjUxLTMuNDIyYy0wLjY0Ni0yLjU0LTIuODk1LTExLjY5My0yLjg5NS0xMS42OTMKCQkJYzcuNzYtMi4yMTUsMTUuNzgxLTMuMTMyLDIzLjk4Ni0zLjcxM2MtNy44MzgtMi45ODEtMTYuNTI5LTMuMzExLTI1LjU1Ni0yLjUyNGMtMS4wODEtNC41MDItMi4wMDctOC44NjktMy4yMTMtMTMuNTc0CgkJCWMxNS40MjEtMy41MzEsMzIuNjQ3LTUuMjg1LDQ5LjE0Mi01LjE2N2MxOS4zMTYsMC4xMzcsNDUuMTc2LDguODc2LDQ1LjE3Niw4Ljg3NmM4Ljc0NCwyLjQyNiwxOC45MDIsMi40MTksMjcuODE0LTAuMjU2CgkJCUMyNDMuNzc1LDE5LjQwMiwyMzEuOTY1LDYwLjIyMywyMzEuOTY1LDYwLjIyM3oiLz4KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjM1NSwzMS44NzVjLTAuNTc4LTIuMzUyLTEuNzE5LTkuMDU2LTIuMDU1LTkuNjk3bC01Ljg4MSw3LjYxNGMwLDAtNy45MzgtMi4wNzUtMTIuMzUzLTIuOTY3CgkJCWMyLjc3MSwyLjkxNiw1LjUsNS41NTksNy45NjIsOC40NTVjLTIuMzM0LDMuNTQxLTUuMzI4LDYuOTAyLTcuNzcxLDEwLjMwOGM0LjUxNy0xLjUyOSw5LjExLTIuODkxLDEzLjYyNy00LjQ1NgoJCQljMy4yNjgsMy4zMSw2Ljc2MSw2LjkxOSw5Ljk5MiwxMC4wOTJjLTAuNTU4LTQuMzE2LTEuODM5LTguNjM5LTIuMjQ4LTEyLjcxOWwxMC4yNTctMy40ODgKCQkJQzIyOC4xODUsMzMuODIzLDIyNC4xNTgsMzMuMDI2LDIyMC4zNTUsMzEuODc1eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZmlsbD0iIzAwMjI0NCIgZD0iTTIxNy4yNDIsMTQuMDYxYzAsMC0yNS44NTktOC43NC00NS4xNzYtOC44NzZjLTE2LjQ5NS0wLjExNy0zMy43MjEsMS42MzctNDkuMTQyLDUuMTY3CgkJCWMxLjIwNiw0LjcwNSwyLjEzMiw5LjA3MSwzLjIxMywxMy41NzRjOS4wMjYtMC43ODYsMTcuNzE4LTAuNDU4LDI1LjU1NiwyLjUyNGMtOC4yMDYsMC41ODEtMTYuMjI3LDEuNDk4LTIzLjk4NiwzLjcxMwoJCQljMCwwLDIuMjQ4LDkuMTU0LDIuODk1LDExLjY5M2MxMi4wNDUtMi43MDEsMjUuMjItMi4yNDksMzUuNTEsMy40MjJjLTI4Ljk4Ni0wLjA3OS0zNS4zNDksNy41OTMtNTIuMTMsMTAuMjQ5CgkJCWM1OS42MTksOC4zNDUsOTQuNjE2LDU1LjkwOSw5NC42MTYsNTUuOTA5YzIuNDIyLTEuMzczLDQuODU5LTMuMjMxLDYuMzc1LTUuNzA3YzEuODAzLTMuMDY4LDIuNDQ4LTcuNDcsMC4xNTEtMTAuNTA5bDEuOTU4LTUuMTA5CgkJCWwtMC4wMjEtMy44MjNsNi4yMjMtMy42MzJjLTEuMjUyLTUuMjUyLTIuMDA2LTEwLjkzOC0zLjM5NS0xNi4yMTdjMy45NzQtMi4xOTksNy45ODgtNC4yNiwxMi4wNzQtNi4yMTgKCQkJYzAsMCwxMS44MTEtNDAuODIsMTMuMDkyLTQ2LjQxOEMyMzYuMTQ2LDE2LjQ4LDIyNS45ODcsMTYuNDg3LDIxNy4yNDIsMTQuMDYxeiBNMjEwLjE0MSw4MC40ODFsLTEuNTA2LDEuODg4CgkJCWMxLjY3OSwwLjYyLDMuNTUzLDEuNzMxLDUuMTk5LDIuMzlsLTAuMTIyLDIuMDgzbC00LjU0MiwwLjEyMmMtMi4wNzMsMS41My0zLjcwMSwzLjAxNC01Ljc3Miw0LjU0MmMwLDAsNC40NDYtMC43NTUsNi43NTMtMS4zODQKCQkJbDQuMjgxLTAuMDAyYy0wLjQ2NCwxLjI1OS0wLjk3MiwyLjM1LTEuNTEsMy40NzNsLTQuMjI5LDAuMTc2YzAsMCwyLjU2OCwzLjA1Niw0LjMzOSw1LjAyMWMxLjk4OSwzLjM3My0zLjQ3OCw3LjUxMi0zLjQ3OCw3LjUxMgoJCQljLTkuNzg1LTEwLjkyNi0yMC40MTktMjIuNDAxLTMzLjQwMi0yOS43ODVjMS4zMTgtMi4wNDMsMy4yOC0zLjEzMyw1LjYtMi44ODZjNC44MjgsMC45MzcsOC45NzksNC4xOTQsMTAuMTM3LDUuNDE5CgkJCWMxLjUwMiwxLjU5OCw0LjIzOCw1LjY5NSw1LjA1NCw2LjI4MWMtMC40MDgtMy4yODgtMS41ODEtNi42MTUtMi4zNzItOS45MjNsLTE0LjY0Mi0xMC4wNDFjMS41MzgtNC4wOSw2LjgzNS02Ljk1LDExLjQ1My03LjA4MgoJCQljNC40NzYtMC4xMzEsOC44NDctMC4wOTIsMTIuMTYsMi41MjVjLTcuNjM3LTAuMTA0LTEwLjM4NywzLjczOS0xMS41MTYsNy4yNjRjLTAuMDU3LDAuMjc3LDE1LjYwMS0wLjA2MSwxNS42MDEtMC4wNjEKCQkJYzAuNTg4LTEuNjA4LDAuODI2LTMuMzQsMS45NzctNC42OTZjMS4yMDEtMS43NCwzLjQxNi0yLjM0Niw1LjM0MS0yLjM5MmMwLjM2NiwxLjI5LDMuOCwxOS4zNywzLjgsMTkuMzcKCQkJQzIxNS43NSw4MC4zNTEsMjEzLjE2Miw4MC4yODksMjEwLjE0MSw4MC40ODF6IE0yMjMuODc3LDUxLjIyMmMtMy4yMzEtMy4xNzMtNi43MjUtNi43ODItOS45OTItMTAuMDkyCgkJCWMtNC41MTcsMS41NjUtOS4xMSwyLjkyNy0xMy42MjcsNC40NTZjMi40NDItMy40MDUsNS40MzctNi43NjgsNy43NzEtMTAuMzA4Yy0yLjQ2Mi0yLjg5Ni01LjE5LTUuNTM5LTcuOTYyLTguNDU1CgkJCWM0LjQxMywwLjg5MywxMi4zNTMsMi45NjcsMTIuMzUzLDIuOTY3bDUuODgxLTcuNjE0YzAuMzM2LDAuNjQyLDEuNDc3LDcuMzQ2LDIuMDU1LDkuNjk3YzMuODA0LDEuMTUxLDcuODMsMS45NDksMTEuNTMxLDMuMTQyCgkJCWwtMTAuMjU3LDMuNDg4QzIyMi4wMzgsNDIuNTg0LDIyMy4zMiw0Ni45MDYsMjIzLjg3Nyw1MS4yMjJ6Ii8+Cgk8L2c+Cgk8cGF0aCBmaWxsPSIjQjBCN0JDIiBkPSJNMjA5LjYwMyw2My4zMThjLTEuMTQ5LDEuMzU2LTEuMzg5LDMuMDg3LTEuOTc3LDQuNjk2YzAsMC0xNS42NTcsMC4zMzgtMTUuNjAxLDAuMDYxCgkJYzEuMTI4LTMuNTI0LDMuODc4LTcuMzY4LDExLjUxNi03LjI2NGMtMy4zMTMtMi42MTctNy42ODYtMi42NTYtMTIuMTYtMi41MjVjLTQuNjE3LDAuMTMyLTkuOTE1LDIuOTkxLTExLjQ1Myw3LjA4MmwxNC42NDIsMTAuMDQxCgkJYzAuNzkxLDMuMzA4LDEuOTYzLDYuNjM1LDIuMzcyLDkuOTIzYy0wLjgxNS0wLjU4Ni0zLjU1MS00LjY4NC01LjA1NC02LjI4MWMtMS4xNTgtMS4yMjUtNS4zMS00LjQ4Mi0xMC4xMzctNS40MTkKCQljLTIuMzE4LTAuMjQ4LTQuMjgxLDAuODQzLTUuNiwyLjg4NmMxMi45ODMsNy4zODQsMjMuNjE3LDE4Ljg1OSwzMy40MDIsMjkuNzg1YzAsMCw1LjQ2Ny00LjE0LDMuNDc3LTcuNTEyCgkJYy0xLjc3LTEuOTY2LTQuMzM4LTUuMDIxLTQuMzM4LTUuMDIxbDQuMjI5LTAuMTc2YzAuNTM5LTEuMTIyLDEuMDQ2LTIuMjE0LDEuNTEtMy40NzNsLTQuMjgxLDAuMDAyCgkJYy0yLjMwNywwLjYyOS02Ljc1MywxLjM4NC02Ljc1MywxLjM4NGMyLjA3MS0xLjUyOSwzLjY5OS0zLjAxMiw1Ljc3Mi00LjU0Mmw0LjU0Mi0wLjEyMmwwLjEyMi0yLjA4MwoJCWMtMS42NDYtMC42NTgtMy41MjEtMS43Ny01LjE5OS0yLjM5bDEuNTA2LTEuODg4YzMuMDIxLTAuMTkyLDUuNjA4LTAuMTMsOC42MDEtMC4xODZjMCwwLTMuNDMzLTE4LjA4LTMuNzk5LTE5LjM3CgkJQzIxMy4wMTgsNjAuOTcyLDIxMC44MDQsNjEuNTc4LDIwOS42MDMsNjMuMzE4eiIvPgoJPGc+CgkJPHBhdGggZmlsbD0iI0M2MEMzMCIgZD0iTTEyNS43MjgsMzAuNzU5Yy0xNi4yMDksMy40MDUtMzMuNTAyLDE0LjA2My02Mi4xMTYsMTguMjM1YzAsMCwyMi41NzMsNC42NjgsNjUuMTIzLTYuOTExCgkJCUMxMjcuOTI4LDM4Ljg0OCwxMjYuNjg1LDM0Ljc1LDEyNS43MjgsMzAuNzU5eiIvPgoJCTxwYXRoIGZpbGw9IiNDMDAwMUQiIGQ9Ik0xMjAuMzk4LDEwLjg2OWMtMzYuNTgsOC4yNjUtNzIuMTIsMjguNzA5LTExNS4xODEsMzQuNTc1YzYwLjU1MSwxLjkyOSw2Ni4wODEtMTAuMTg1LDExOC40MTYtMjEuMTk1CgkJCUMxMjMuNjMzLDI0LjI0OSwxMjEuNTQ5LDE1LjMzMywxMjAuMzk4LDEwLjg2OXoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #013369 50%, #0a0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#D50A0A",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#D50A0A",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Super Bowl LX */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Super Bowl{" "}
            <span style={{ color: "#D50A0A", marginLeft: "20px" }}>LX</span>
          </div>

          {/* Matchup */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "4px solid #69BE28",
                  background: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img src={seahawksLogo} width="100" height="43" />
              </div>
              <span
                style={{
                  color: "#69BE28",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  display: "flex",
                }}
              >
                SEAHAWKS
              </span>
            </div>

            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#3b4560",
                display: "flex",
              }}
            >
              VS
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "4px solid #C60C30",
                  background: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img src={patriotsLogo} width="110" height="51" />
              </div>
              <span
                style={{
                  color: "#C60C30",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  display: "flex",
                }}
              >
                PATRIOTS
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#D50A0A",
              marginTop: "24px",
              display: "flex",
            }}
          >
            Prop Bets Challenge
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#3b4560",
              marginTop: "4px",
              display: "flex",
            }}
          >
            Make your picks and compete with friends
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
