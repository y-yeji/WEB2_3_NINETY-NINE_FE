# ✨ OnCultrue 
- 다양한 오프라인 문화 행사 정보를 한 곳에 모아 사용자가 쉽게 탐색하고 공유할 수 있는 온라인 기반의 종합 문화 생활 플랫폼 서비스

<br />

## 👨‍💻 Developers
|Frontend|Frontend|Frontend|
|:----:|:----:|:----:|
| <img src="https://github.com/user-attachments/assets/c80ea5bc-2e04-4cf3-b9b2-57ae23d09a4d" width="100"/> | <img src="https://github.com/user-attachments/assets/f20f463d-5e1a-47c7-828f-43a98cc3f4f9" width="100"/> | <img src="https://github.com/user-attachments/assets/eed376b4-883c-4ce6-9a9b-0efb3b85e007"  width="100"/>
|왕정훈|이예지|정다윤|
|[@wjh1010](https://github.com/wjh1010)|[@y-yeji](https://github.com/y-yeji)|[@dilma01](https://github.com/dilma01)

<br/>

## 💻 Tech Stack
### Project setting
  
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

### Code Formatter

  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">


### Etc
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

<br/>

## ✏️ Code Convention 
### Commit Message
- 🐛 **Fix**: 버그 수정 및 오류 해결
- ✨ **Feat**: 새로운 기능 추가, 사용자 입장에서 변화 발생
- 🎉 **Init**: 프로젝트 초기 세팅 및 환경 설정
- 🧪 **Test**: 테스트 코드 추가 또는 리팩토링
- 🛠️ **Chore**: 기타 유지보수 작업 (주석, 의존성 관리, 문서 수정 등)
- 🎨 **Style**: UI/UX 스타일 변경 (CSS, styled-components 등)
- 🔄 **Refactor**: 코드 구조 개선 (기능 변경 없음)
- 🗑️ **Remove**: 파일 또는 코드 삭제
- ✍️ **Format**: 코드 포맷팅 변경 (코드 스타일 유지 목적)
- 📝 **Docs**: 문서 추가, 수정, 업데이트

<br/>

## 📋 Feature

- **문화 일정 제공**: 전시회, 팝업스토어, 뮤지컬 등 다양한 문화 이벤트 정보를 한눈에 확인 가능.
- **저장 기능**: 사용자가 관심 있는 문화 이벤트를 저장하는 가능.
- **커뮤니티 참여**: 문화 경험을 공유하고 후기를 작성할 수 있는 공간 제공.
- **알림 기능**: 관심 이벤트 시작 전 알림을 통해 놓치지 않도록 지원.

<br/>

## 🛠️ Troble Shooting

### 🚨 카카오 맵 인스턴스 중복 생성

📍**문제 요약**
- Kakao Maps SDK를 사용하는 지도 인스턴스가 중복 생성되는 현상 발생.
- 이로 인해 지도 확대/축소 또는 이동 시 새로운 지도 인스턴스가 반복적으로 생성되어 성능 저하 및 사용자 경험 악화 초래

🔍**원인 분석**

<img alt="troubleshooting_image_1" src="https://github.com/user-attachments/assets/1e5e1975-215c-4892-9bb8-886dea9f85c0" />
<img alt="troubleshooting_image_2" src="https://github.com/user-attachments/assets/f0d79f41-9231-4406-ba63-08ecfb775126" />
<br/>

-  Map 컴포넌트에서 Kakao Maps SDK를 <script> 태그로 로드하는 동시에 useKakaoMap 훅 내부에서도 window.kakao.maps.load()를 호출함
-  SDK가 아직 완전히 로드되지 않았는데도 지도 초기화를 시도하면서 지도 인스턴스가 중복 생성되는 타이밍 이슈 발생
-  SDK가 아직 로드되지 않았는데도 초기화 시도로 인해 지도 초기화 로직이 컴포넌트 렌더링 흐름과 분리되지않음으로 인스턴스가 중복 생성

<br/>

⚙️**해결 방안**

<img  alt="troubleshooting_image_3" src="https://github.com/user-attachments/assets/871965d2-2482-43e8-9198-728a73285187" />
<img  alt="troubleshooting_image_4" src="https://github.com/user-attachments/assets/775cbee0-aeb8-4c8c-bab4-a72ae5ae9a4c" />
<br/>

- Kakao Maps SDK는 Map 컴포넌트의 <Script> 태그에서만 로드하도록 변경하여 중복 로드를 방지
- useKakaoMap 훅에서는 initMap이라는 지도 초기화 함수를 분리하고, <Script>의 onLoad 이벤트에서만 호출되도록 구조 개선
- isMapReady 상태를 추가하여 지도가 완전히 준비된 이후에만 마커 생성 등 다른 작업이 실행되도록 제어
- 이로 인해 Kakao SDK 로드와 지도 인스턴스 생성 타이밍이 명확히 분리되어 중복 생성 문제를 해결

✨**결과**

![troubleshooting_result_gif](https://github.com/user-attachments/assets/10dc0a8c-6e5e-4648-9891-7c6751542e8d)
