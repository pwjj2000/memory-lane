
# MemoryLane

## Proposed Level of Achievement
Project Gemini

## Motivation
In this day and age, technology and social media have taken over the driver’s seat when it comes to entertainment. The local childhood games that brought us countless hours of amusement in the past are slowly becoming a distant memory. Furthermore, in the Covid-19 pandemic where face-to-face interaction is limited, it is much harder to compete in “hand games” like we used to.

But what if there is a way to instead use technology to keep the tradition of our childhood games going? What if players could come together online and reminisce about old times?

## Aim

We hope to develop a platform for users to virtually compete in popular (local) childhood “hand games” - Zha, Chopsticks, and Thumbs.

## Scope of Project

The **Web Game Application** provides an online interface for players to play and compete in the games.
  
## Product

Check out our website at [https://the-awesome-pwjj2000-site.netlify.app/](https://the-awesome-pwjj2000-site.netlify.app/)

## User Stories
| No. | Priority | As a... | I want to be able to... | Achieved? |
|--|--|--|--|--|
| 1 | High | User | Sign up for an account in MemoryLane | Yes |
| 2 | High | User | Log in to MemoryLane | Yes |
| 3 | High | User | View all the playable games from the main lobby | Yes |
| 4 | High | User | Access the individual game menus from the main lobby | Yes |
| 5 | Medium | User | Access the tutorials for each game through individual game menus | Yes |
| 6 | High | User | Choose to start a new game from individual game menus | Yes |
| 7 | High | User | Create a new room when commencing a new game | Yes |
| 8 | High | User | Join an existing room that I know of when commencing a new game | Yes |
| 9 | High | User | Join a random room when commencing a new game | Yes |
| 10 | High | User | Know the winner when the game has ended | Yes |
| 11 | High | Zha Player | Select either bomb, plane or human option on each turn | Yes |
| 12 | High | Zha Player | See both my choice and the opponent’s choices on each turn | Yes |
| 13 | High | Zha Player | See the number of lives that my opponent and I have left | Yes |
| 14 | High | Chopsticks Player | Choose my desired move on my turn | Yes |
| 15 | High | Chopsticks Player | See the status of my opponent and myself after every turn | Yes |
| 16 | Low | Chopsticks Player | Only see the available moves I can make on my turn | Yes |
| 17 | High | Thumbs Player | Choose the number of thumbs I want to raise on each turn | Yes |
| 18 | High | Thumbs Player | See the results of every turn | Yes |
| 19 | High | Thumbs Player | See the number of thumbs that my opponent and I have left | Yes |
| 20 | High | Thumbs Player | Choose the number of total thumbs I think both sides will raise when it is my turn | Yes |
| 21 | High | User | Access the leaderboard for each game from each individual game menu | Yes |
| 22 | High | User | See the standings for each game when in the leaderboard | Yes |
| 23 | Medium | User | Access an overall leaderboard for all the games from the main menu | Yes |
| 24 | Medium | User | See the standings overall for each user when in the overall leaderboard | Yes |
| 25 | Medium | User | See my individual standings in all leaderboards | Yes |
| 26 | Low | User | Reset my MemoryLane password | No |
| 27 | Low | User | Go through a step-by-step tutorial of each game | No |

## Features

 - **Login/Signup**
	- Basic Login/Signup feature with Supabase authentication
	- Login Page
	- Signup Page
- **Main Menu/Dashboard**
	- Links to each of the game menus, as well as a link to the overall leaderboard
- **Games (Zha, Chopsticks, Thumbs)**
	- Game Menu
		- Contains links to the start a new game, or access the game’s tutorial and leaderboard
	- Create Room
		-   Enables players to create 2-player rooms to play games
		-   Enables possibility of playing with friends instead of strangers
		-   Connects player to a websocket which joins the specified room via Socket.IO
		**![](https://lh3.googleusercontent.com/qYlP6XmiH_LthAOyH-3xZ8XoNm9cbEbL9Xq3nGG9cXC2zvvX9ORu59uP1cAH0WOCIlYIYpVOd_VI1V3iqnXPrWs8YNIO_Dl2zc_WxqAYrAs3RrH5rr2fiLsqxw4SFWonFhM2KabNoCKJ0gBxRZc6kMU)![](https://lh3.googleusercontent.com/XarNI_T0mnVtP43p258_mj7E6JOZ629d2retR_YDvKSLJ4cHDfYaUYKldD6KzaVGOGF417qkk8aCL0W-95hIjdz_LET4aF5EIzfHvsceXPvlElbhnaq6NcGuwpRZ2PM-TSDk9v5ZdoOubWrGTTWlTvQ)**
	-   Join Room/Join Random Room
		-   Enables option to play with either friend or stranger
		-   Connects player to a websocket which joins the specified/random room via Socket.IO
**![](https://lh6.googleusercontent.com/f5NgEheb7PufOlZkGviE3T1DPZ8Q0tGnCNapeKGjbSf-73mLa2kPr9_yFI-rjb6u-_YKeFcpNPj51A9BXTdZvYl70eIyE77Do-W22gHFCjOoJoF4M6Hn5FPCF4z-9Hdy3rYfWHxhc1r4Nw-FaEFniOI)**
	- Tutorial pages
		- Tutorials for each of the games that can be accessed from individual game menus
		**![](https://lh4.googleusercontent.com/iAnE3A0ZEcABTup395TiHGPHgnaQ_ofgnoDx_ovSxykufa4KwfxlGuO0EMN3mFM6cstz2yuR7YhER1S_uGiDgf8KXFl-c-A7P4S2W5Dsbk-OummiB-GP8wL-xFEKPk3avD3rPQMx06ZcxzYs_ATYV8s)**
	-   Gameplay
		-   Straightforward - Only requires player to click on buttons to make choices
		-   Choices are emitted to the server, which will determine the outcomes of each turn, before emitting them back to the players
		- Unplayable choices are hidden
		-   At the end of the game, scores are updated to Supabase database
		**![](https://lh4.googleusercontent.com/tzk5Vn7BEDnuAf09nhZDmWPm_PtvrIf4RGzinDTaP05iGOij_VDjTedtH40gvoHTA0W53OjEwQMhgwaVI-8bjcSy3QGB8tijVgOmmbwTDjpNY_hj0ebzl30YozBrPvXhRh0ceYarU_v_tvm6AfPlHPw)**
- **Leaderboards**
	-   4 leaderboards - Overall, Zha, Chopsticks, Thumbs
	-   Visibility of personal ranking and score
	-   Information retrieved from Supabase database
	![](https://lh3.googleusercontent.com/A11ev6sXlXqdYfZXyOU8Ei6kQbu1DLxUPF-fRHMhcFlxhg3xVDfAUbxJEO50WeQ2gw3615zCg9_cSZjblbJCTENVZrRk3akMCmiX6K-SxdQ-CT8PedL7cEdNRFPiL-WBIcccOEX_fWKJCkLR76HxhUs)
![](https://lh5.googleusercontent.com/WJOV2m_dCgg1KrVPt7nj6TK5py0JMhcoLrtLK62oU5lsxMwRadOlwiXR9L57dIhwTB0voZLKuEQcu5LmH6wpnjMxYy4EaOy9uPp5vomizu8d0ToTw8N6fJbs5KTX83Emkm6cIicBdUnT1qWDsbpGrSw)
## Bugs
| No. | Priority | Bug | Action | Resolved? |
|--|--|--|--|--|
| 1 | High | Game still shown /playable even after winner is decided | Removed game interface upon the end of a match | Yes |
| 2 | High | Death of each hand on Zha and Thumbs not updated properly after end of each turn | Changed the condition to update based on the resulting lives after the turn | Yes |
| 3 | Low | Game does not return to create/join room page automatically upon end of game | Added a line of code for it to do so after 5 seconds | Yes |
| 4 | High | Server crashes sometimes when Player 1 disconnects | Unable to reproduce the error consistently to find out what is wrong. Error tracking is still in progress. | No |
| 5 | High | Zha - Game unresponsive if the non-attacker locks in before the attacker | Changed logic to include all scenarios in the server (2 of them below were not added before): Player 1 & Attacker; Player 2 & Attacker; Player 1 & Non-Attacker; Player 2 & Non-Attacker | Yes |
| 6 | High | Players’ scores get updated regardless of winning or losing | Changed code logic | Yes |
| 7 | Medium | Buttons’ CSS becomes messed up when an image is used as a button | Changed each affected buttons’ CSS to default before using an image | Yes |
| 8 | Low | User unable to login to 2 different accounts when under 2 different tabs in the same window (regardless of incognito or not), or 2 different windows of the same type (normal/incognito) | Suspected to be a side feature/effect of Supabase authentication. No interim measures available at the moment. Recommendation to users: Login an account in a normal window, and the other in an incognito window | No |

## Problems Encountered
**Setting up rooms for PvP gameplay**
We encountered problems setting up web sockets so that players can play in a multiplayer context.

Initially, we managed to find a tutorial online to create a multiplayer Rock, Paper, Scissors game using basic HTML, CSS, and Socket.io (web sockets). We spent a lot of time trying to convert it to the context of our project (ReactJS and our games) but failed. We suspect that the implementation of Socket.io in HTML vs ReactJS is different.

We then had to source for new tutorials that incorporate Socket.io in ReactJS apps before finding one that teaches how to make chat apps. It is very different from the context of our project but clearly illustrates the requirements and basic functionalities of Socket.io in ReactJS apps.

**Implementation of games**
We ran into some trouble during the implementation of the games, as we realised that the algorithms for some of the games are not as straightforward as they seem.

For example, we likened Zha to rock, paper, scissors, but there were some major differences that we did not take into account. For example, in Zha, there is an attacker and defender for each turn, whereas in rock paper scissors both players can attack on each turn.

In order to implement the Zha game, we had to change the entire structure of the game, and start again.

**Researching for tutorials on leaderboard creation**
There are not many online tutorials on leaderboard creation when it comes to Supabase. As such, a lot of trial and error is required based on the Supabase documentation, which is inefficient.

**Familiarisation with Tech Stacks**
Being new to the software engineering scene, we had to pick up a lot of these technologies from scratch. Not only that, some of the online tutorials can be outdated due to the software being constantly updated over the years.

## Testing

 - Integration Testing
	 - Testing rooms upon implementation of a new game
		 - Checking that a player is not supposed to join a room with same Room ID but different games (e.g. Zha > Create Room > Room ID: asdf; Thumbs > Join Room > Room ID: asdf)
		 - Checking that a player can create/join room
			 - Server will emit a message when room is created successfully
			 **![](https://lh5.googleusercontent.com/PduAoOu95St8zf32EXh6Ak12Lo1YfrXcSvUgDdHX11CU4TJGwmcU_npnV4jJx5Qlti1KPHHE185lK8FlsbH2i32SVkUXFcw7a7ATswkdZCK7cJ0tKcZe8GCnhQCfphzpMPQjXPXmNKuPf4IAHhrHzkY)**
			 - Server will emit message and trigger the game to start when room is joined successfully
			 **![](https://lh5.googleusercontent.com/D99nxKSI0Ln91ecnHqm-E3E2bN4FoRtl7GGxsiT_r-kCx3KlgKnnbcLwl7aFX1DBrvOQk8lK48yoY1uEpd0T-Oei0LUJsvQauLEMcz9q7iphlXfIrQRdhPte1WGs22QQ621GMoh9V33Jl_WNuj3fYPc)**
	 - Testing leaderboard functionality across all games
		- Retrieve player’s game statistics before game starts and check if it is updated
		- At the end of game, ensure that overall score and game score are updated properly
		- Check whether player’s game statistics has been updated properly after the game in the leaderboard
		- Check that rankings are amended accordingly
- System Testing
	- Check that login/signup can still be done normally
	- Check if the backend server deployed is working normally by room creation/joining
	- Check if database is still accessible
- Heuristic Evaluation
	- Visibility of System Status
		- Login/Signup - Brings user to dashboard upon successful login/signup; Displays error message otherwise
		**![](https://lh6.googleusercontent.com/nZDeDh0fgHm8jHjOveKA3dKHt9vi54tn-rfKQVIwfwdPfcICB2iaoGybDGIC_a6Oz1T9T22n9gYM92A0kbTCZq1_pkGa6hWO0PApnVkYYJ2BnggiZ4b98PCZ4Y_61zSjOcl1iXI5-Byy999LcbMX1xw)**
		- Create/Join Room - Displays a message or triggers game to start upon successfully creating/joining a room; Displays an error message otherwise
		**![](https://lh4.googleusercontent.com/GQm-7gOhBNGAf6h2uXTGQjE2b4f97vA2BUPjPxTqBQ48KAUd42nMfUdf7WRPQDnfk9wO5GGB_HcacO7CExOKpby58BXLEv1hocnPEo_sUVuUmjFUdZJG-hfJfD4pDeZtWoBq97YN85jDayCpEQhtzd0)**
		- End of match - Displays a message on who’s the winner and updates the scores of the winner live
		**![](https://lh5.googleusercontent.com/u6zj-NnF2sjDrOuq7FgauuzCgQ5TnyF12h8U034tem1XN4xRSUOkV69M_sVXw9xBzejf_Vfw3PU-f5vVUF512w5-a7BUx1rGimtgTpV4XRo8f8aMUpwHFc_zOAuleOMgnqAVwjpqbI_jXw6v1YWF1L8)**
	- Match between System and the Real World
		- Zha - Although the game is played with hands with 3 different stances mimicking a plane, human and bomb, we decided to use images of the actual things instead to make it more intuitive for new players
		**![](https://lh5.googleusercontent.com/TX-JpLyFfCanzBg1ujMflaFwmn_iYv3k8NNLrJxIh-6_RBc3c8paKvDnutgHEAmvt5aFMWq9o-qhn-FjNg48CGW7mPKedQmH0uGGh4nbffD46w3DqKJEq6KS2hMpCtVZZvYxNIc0tuHYuBMX263BkJQ)**
		- Chopsticks and Thumbs - Just like how the games are played with fingers/thumbs in real life, we used images of them in the game
		![](https://lh3.googleusercontent.com/rnFuFB6Z-_6ytOYMpfYh6ccqPjWSsdw5ZA05ChTk12QpTS04cAj2_2x0YduZMIHVaTgkUEXgSqDlg2i1ZF9HvKQai8oUYgnQd_Y3jOyJcd4xrKYiM3hkJvRsP1OrJ7qMrTc_HS-pt2oT77ZLuYAvvgE)
![](https://lh3.googleusercontent.com/ute2_wF3NLVt5DNhVYC7tLksA4pR41ayuQgf3VkcDEbJFYgFKLJ2QWZFaeDKyJsvCli98-ABf-0zcYklCFIX_Y_HQv0rmPZUeVjw8Z2n2OSjDPyFV2d3qNcRJvVuLAevwEY86p6YQWCA5-7KDLFtHFk)
	- User Control and Freedom
		- “Back” Button in almost every page
		- Can access all 4 leaderboards easily once user is in any leaderboard page
**![](https://lh5.googleusercontent.com/7D9oCclsX5adbxJSyGzGPRmyZtiXAunn6qY4MCp64HDLB4cxStNBG_f4h6UkYmj8CVwnJoQn1xZ2xJWomBoCkaNhudeOIs16U3HXJjSnxjxwk39D-IECru8BcwWukhc-bVnYeAeQTTL8qXqtZyscTcw)**
	- Consistency and Standards
		- Same 3 logos to represent the 3 games
		- Same icons to represent leaderboard and “back” button
![](https://lh6.googleusercontent.com/uRYD5xCa053fB10PzRYW_UVJ4yfbCQtkh8wQzKlyCvImhKxytZ4QEpQ-l7BnLGPJ1iozgNYLCefRzATh1pe2jXngGucVBq78W7QVO_DRTLTHiS_aF0H9CAX_qEeIUo76jT0J2FGKE1O_EoHqTyWoJps)
	- Error Prevention
		- Zha & Thumbs - Games that require users to make multiple selections. Enabled a “Lock-In” and “Reset” feature to prevent users from mischoosing their choices
		**![](https://lh5.googleusercontent.com/8Nxf3P32Ej1r4FB8DCBU8WBdf3ZzDK-DbO836m-ioO1BQEN9L_JVcxdqaPpr5K8VDAqutylqC8MmEXM09rr6A5qQrLW4n1Uct6tgHx5WjVk84_pY4kEvpMwpEimQCWsohp9Zq5tRg1aBfqkwseQzLSE)**
	- Recognition rather than Recall
		- On top of game tutorials, short game tips are added in the game itself so that players are reminded of the objective of the game
		- Games show only possible choices that can be chosen to prevent errors and confusion
	- Aesthetic and Minimalist Design
		- Every page has few buttons to click
		- Unavailable buttons are hidden
		- Each game has a basic game interface for players to choose their options, and a log at the bottom to clarify to players what happened in the previous turn
- Cognitive Walkthrough
	- Users create/join a room
		- Will users try to achieve the right result? **Yes, creating/joining a room is required to start a match**
		- Will users notice that the correct option is available? **Yes**
		- Will users associate the correct action with the result they’re trying to achieve? **Yes**
		- After the action is performed, will users see that progress is made towards the goal? **Yes, users are notified when they created a room successfully, and the match begins immediately once 2 players are in a room. Error message is displayed otherwise.**
	- Users make a choice in a game
		- Will users try to achieve the right result? **Yes**
		- Will users notice that the correct option is available? **Yes, unavailable choices are hidden, meaning users can only select available choices**
		- Will users associate the correct action with the result they’re trying to achieve? **Yes**
		- After the action is performed, will users see that progress is made towards the goal? **Yes, after every turn, players there will be a log at the bottom showing what happened in that turn.**
	- Users access the leaderboards
		- Will users try to achieve the right result? **Yes**
		- Will users notice that the correct option is available? **Yes**
		- Will users associate the correct action with the result they’re trying to achieve? **Yes**
		- After the action is performed, will users see that progress is made towards the goal? **Yes**
- Unit Testing
We did some unit testing through Jest for the jsdom of the website, as well as Firecamp, for the testing of rooms. For Firecamp, it is a third party app that can simulate a user and we used it against our actual website to observe whether the behaviour is the same.
Jest:
	| Test | Pass/Fail |
	|--|--|
	| Should render App | Pass |
	| Should render Zha menu page | Pass |
	| Should render Zha new game page | Pass |
	| Should render Zha tutorial page | Pass |
	| Should render Zha create room page | Pass |
	| Should render Zha join room page | Pass |
	| Should render Zha game page | Pass |
	| Should render Chopsticks menu page | Pass |
	| Should render Chopsticks new game page | Pass |
	| Should render Chopsticks tutorial page | Pass |
	| Should render Chopsticks create room page | Pass |
	| Should render Chopsticks join room page | Pass |
	| Should render Chopsticks game page | Pass |
	| Should render Thumbs menu page | Pass |
	| Should render Thumbs new game page | Pass |
	| Should render Thumbs tutorial page | Pass |
	| Should render Thumbs create room page | Pass |
	| Should render Thumbs join room page | Pass |
	| Should render Thumbs game page | Pass |
	| Should render overall leaderboard | Pass |
	| Should render Zha leaderboard | Pass |
	| Should render Chopsticks leaderboard | Pass |
	| Should render Thumbs leaderboard | Pass |
	**![](https://lh6.googleusercontent.com/keILwNxGYMimhcgEc3dl0PeOD9YwEw9vu-L-pc-SFXaebiQ09F93bjqH1qWswFnYpKxTIBLM2aoQCCVPKTV6TjdwN_5fcrFGML2cIuyoV-ttTKHFNoLxzlZ3TCSjNtcUKBLa5006dKd9yhbIKQbujko)![](https://lh3.googleusercontent.com/K5IzoBk3Y1keAlHoFi723XUa6IXlFFNwIWzOCeLf6I9kyXo8Ogvri7Yi_YlKWEq93DH1dxBIjS4PdRO4tycO3tnL1SXgnKJa49MsM5jR92Js1YipowM4h3HCfasHPvWuIFWNm_Y94mkiYozbDrS0V5g)![](https://lh4.googleusercontent.com/56c3XN_4Vlydem4RwCAQ3gWh655p_3yXHirvkNSts7WZinLVmmipapJgxy0G6wLBgzUA_2JnUskr7H7wKCrZ3cZYlAe7qx4VQjAQRk2b8ZtZtkvuu-dHMtQb_r57fMttI_rWm3h_MLju-H7T_7t9wKY)![](https://lh6.googleusercontent.com/3jxuzNCjyra1XhL9ipEFb_KBmHrzoeEt22EVR_cs7c12Dd63PpV0rT91V2s1SvNVXRligBrE6meIiELxWqtBXu_LrAdyPqdXqTcM4c2ndDabhdQq6xHHgsXNUt_Egx1DtN66byv1xY-EXiqjFYGw2AM)![](https://lh5.googleusercontent.com/o6EACxSdUq6rMi9c6FXMzoFsXN08BEAeviwpNeoHBltpxorpgbol_3Tk_GxkcdOaGKeaCHtSFBAXBNAp-D-Yc94OGEF8NmsPyx0xkNuSpAJ6IbIGARrGdAuySujyxe-LGkO6DgbOvUggAHvKk2ELqEo)**
Firecamp:
	| Test | Pass/Fail |
	|--|--|
	| Create room in Zha | Pass |
	| Join room in Zha | Pass |
	| Join random room in Zha | Pass |
	| Make a move in Zha | Pass |
	| Create room in Chopsticks | Pass |
	| Join room in Chopsticks | Pass |
	| Join random room in Chopsticks | Pass |
	| Make a move in Chopsticks | Pass |
	| Create room in Thumbs | Pass |
	| Join room in Thumbs | Pass |
	| Join random room in Thumbs | Pass |
	| Make a move in Thumbs | Pass |

Firecamp testing video:
[https://drive.google.com/file/d/1KsBDR_FPwXQBvrhi5K6A0yeJ_N0beFUa/view?usp=sharing](https://drive.google.com/file/d/1KsBDR_FPwXQBvrhi5K6A0yeJ_N0beFUa/view?usp=sharing)
## Software Engineering Principles
- Error Catching
	- Login/Signup
		- Signup with an already authenticated account
![](https://lh6.googleusercontent.com/nZDeDh0fgHm8jHjOveKA3dKHt9vi54tn-rfKQVIwfwdPfcICB2iaoGybDGIC_a6Oz1T9T22n9gYM92A0kbTCZq1_pkGa6hWO0PApnVkYYJ2BnggiZ4b98PCZ4Y_61zSjOcl1iXI5-Byy999LcbMX1xw)
		- Login with an unauthenticated account
![](https://lh4.googleusercontent.com/vVYayrb1WfqcOpd3U9GefXWrhSd-c1S9r4S_QAWdk8-xfYpPfCmTVpnLLshPdLUznV61CDsYJ09sSOIbP4nm0IHhn5SZjG3i07KFU4-uSfRBX-VQf9k6Yz76W180ZOnqSur3dY4adRefchDqpzija-c)
	- Create/Join Room
		- Joining a room with an invalid Room ID
![](https://lh6.googleusercontent.com/R1IA-y2ayLm91Z8yEcFVnL3bxeTTGoU8c6PifjEWQyOlOiF_SKVUBWDMCw7MFLTZEhToKeCmI7D6ceWx2AqS1Re62zHU30yWUG1ff1YDfnGQat9KFi7iXlM7ziKkZbwWGwyoJZ3WRZncw05DuyTTBS4)
		- Joining a random room with no empty slots
![](https://lh4.googleusercontent.com/GQm-7gOhBNGAf6h2uXTGQjE2b4f97vA2BUPjPxTqBQ48KAUd42nMfUdf7WRPQDnfk9wO5GGB_HcacO7CExOKpby58BXLEv1hocnPEo_sUVuUmjFUdZJG-hfJfD4pDeZtWoBq97YN85jDayCpEQhtzd0)
		-   Joining a room with with same Room ID but for the wrong game
![](https://lh6.googleusercontent.com/Fz4cMmeOeht0XlYauE2WFWjaLpYbid2KHLdg_7ZrH-RbE0cd6NqvH0sixdU1YKKNeYz81cW1BHn-lRd-4qbEi-i7GoKwVGBJYSKmuCOn2VoC58F2nN1K8cozo2RVvAPHCyZbsT8GwlsG3OVYo_1STXM)
- Github Version Control
We stored our project in a Github repository for tracking and management purposes. In addition, we communicate with each other via text prior to making new pushes so that we are both aware when there are new changes.
We mostly used basic commands such as git clone, add, commit, push.
In addition, we used branching during our testing process so that the modification of code during testing will not interfere with our master code
- Clear Distinction of Roles and Responsibilities
To minimise conflicts with our coding process, we clearly defined our roles and responsibilities beforehand.
One of us dealt with the frontend and design (Nicholas) while the other dealt with the backend and database.
- Security
Using Supabase Row Level Security (RLS), this prevents unauthorised modification of another user’s data/scores, thus keeping the integrity of the game and leaderboards.
During authentication users are assigned to a unique user ID (UUID). During the updating and retrieval of scores, the client only performs the actions when the current UUID that is logged in corresponds to the row with the same UUID in the backend database (Supabase).
![](https://lh5.googleusercontent.com/hGLLMRvRI27VWXp8SrJa_KPnHv41HbE7K9jXr8wGzFU69bow-IVqWCZsmvkIBI0wwaF-i7Js_3vaO7mH2XnQM8siTjLo0octJWcFcv0O4ezXYzjZOiegf9FZ5yAzWnmgfZpItnmaNIjdgfIcTUDNqL0)

## Tech Stack
Since both members are new to software engineering, we sourced for technologies that seem easier to pick up and have more tutorials online, be it in the form of Youtube videos or Mission Controls.

Technologies Used:
 - ReactJS
	 -   Frontend
	 -   Complements our knowledge of JavaScript
 -   Supabase
	 -   Database
	 -   Supabase Authentication for Login/Signup
	 -   Supabase Tables for Leaderboard creation/management
 -   Socket.IO
	 -   Game server
	 -   Facilitate Room Creation/Joining for PvP gameplay
 -   Heroku
	 -   Deployment of server
 -   Netlify
	 -   Deployment of client
 -   Github
	 -   Project management

**Software Architecture**
![](https://lh4.googleusercontent.com/IGgTSL3OokUpF0tlzhg76-JERIO8lpmsp_UInwT6NM5nMsqfV0sIj7yWIgIeAgyLp6MlY4F1RbLyTwvir-iqaFbcSh3Dh4-GaM_X4qMkmLl-8ATuJySYWZw9bTKevmRkzdyQFzy8jimh-x3Hbp3XyCc)

  

**Application Design Flowchart**
Here is a brief overview of our application design with some description of each feature. For a more comprehensive step-by-step process, please refer to the appendix.

![](https://lh5.googleusercontent.com/2iYV9JSTEWnYAhw2QywQw9lpR4zKX3J1VGkzyDrpJzqIemhXMjBhpX6BB57oe4chIi2eLcyv4O4jKmE7vtgy4vF_ImNEC_wONLJQwEVBbPRTuU7aZ-qv0T-S0Ab6nRPO6MtfFpH8lgNXp0FAwt3K814)

## Appendix
**Comprehensive Application Design Flowchart**
![](https://lh6.googleusercontent.com/J2Xv2Nr9GuX724kw7oeDXKofhPSxWEFyOqwCwzIZjSuIK8scQ1f25wvM7qs2XoOoY0l72gv6gxggQ4y3dTtntHfDEex6RTWzEUPss09K0NHR86Fb3GDrzOuh9-h-xAWDt4wqc01PICvu9PZljhSXgeA)

  
  

**Timeline**
- Liftoff + Milestone 1 (May):
	- 9 - 16 May: Refining of project idea, application features
	- 17 - 23 May: Picked up necessary technologies - Reactjs, Supabase, Socket.io
	- 24 - 30 May: Implementation of login feature and creation of app mockup
- Milestone 2 (June):
	- 31 May - 6 June: Implementation of Zha game and tutorial
	- 7 - 13 June: Testing of Zha game and implementation of multiplayer feature
	- 14 - 20 June: Implementation of Chopsticks game and tutorial
	- 21 - 27 June: Testing of Chopsticks and multiplayer feature
- Milestone 3 (July):
	- 28 June - 4 July: Implementation of Thumbs game and tutorial of all 3 games
	- 5 - 11 July: Testing of thumbs game and implementation of leaderboard
	- 12 - 18 July: Integrating multiplayer feature and leaderboard across all games
	- 19 - 25 July: Testing and debugging