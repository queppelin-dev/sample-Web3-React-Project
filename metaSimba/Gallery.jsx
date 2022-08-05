import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "../css/gallery.css";
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Line from "../components/other/Line";
import SearchIcon from "@mui/icons-material/Search";
import FiltersBox from "../components/other/FiltersBox";
import SimbaCard from "../components/cards/SimbaCard";
import chimba from "../assets/pictures/chimba.png";
import kitty from "../assets/pictures/kitty.png";
import { useEffect } from "react"
const { ethereum }  = window;
// import Web3 from 'web3'
// import Web3Modal from 'web3modal'

export default function Gallery() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [nftType,setNftType]=React.useState("allNfts")
  const [alignment, setAlignment] = React.useState("META");
  const [walletAddress, setWalletAddress ] = React.useState('');

  const handleToggle = (newAl) => {
    setAlignment(newAl);
  };

  window. ethereum. on('accountsChanged', (accounts)=>{
    // if(walletAddress===''){
    //   console.log("no walletAddress yet");
    // }
    // else{
    //   console.log(walletAddress)
    // }
    // console.log("account changed from ",accounts.length)
  })

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') 
    {
      console.log(walletAddress);
      window. ethereum. on('accountsChanged', (accounts)=>{
        console.log("my accounts are",accounts)
        if(accounts.length !== 0){
          setWalletAddress(accounts[0])
        }
        else{
          setWalletAddress('')
          console.log("no account found")
        }
      })
    }
  })

  const connectWallet = () =>{
    console.log("LET's connect your metamask")
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      ethereum.request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log(accounts);
        setWalletAddress(accounts[0]);
        console.log("set your nfts from here");
        setNftType("MyNfts")
        // walletID = `Wallet connected: ${account}`;
      })
      .catch((err)=>{
        console.log("not  account is connected to my metamask")
        console.log("error",err)
      })
      console.log("not shoing anything ")
    }
    else{
      window.open("https://metamask.io/download/", "_blank");
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  let filtersArr = [
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Type.png",
      title: "type",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Special.png",
      title: "special",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Clothing.png",
      title: "clothing",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Offhand.png",
      title: "offhand",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Hair.png",
      title: "hair",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Headgear.png",
      title: "claws",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Face.png",
      title: "headgear",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
    {
      icon: "https://www.azuki.com/filtericons/Black/0/Neck.png",
      title: "face",
      subtypes: ["HUMAN", "RED", "BLUE", "SPIRIT"],
    },
  ];

  let filters = (
    <Box className="filters">
      <Typography
        sx={{ alignSelf: "start", paddingInline: "6rem" }}
        variant="h4"
        fontWeight="bolder"
      >
        Filter
      </Typography>
      <Line props={"60%"} />

      <div onChange={() => {}} className="cap">
        <div className="searchBox">
          <SearchIcon
            className="searchicon"
            style={{ color: "white", fontSize: "2rem" }}
          />
          <input
            type="text"
            placeholder="Search by serial..."
            onChange={(e) => console.log("e>>>>", e.target.value)}
            className="searchBar"
          />
        </div>
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {filtersArr.map((e, k) => (
            <FiltersBox props={e} key={k} />
          ))}
        </div>
        <img
          src={kitty}
          alt=""
          style={{
            width: "5rem",
            marginTop: "1rem",
            height: "auto",
          }}
        />
      </div>
    </Box>
  );

  let nfts = (
    <Box className="filters" overflowY="auto" height="90vh">
      {/* <ToggleButtonGroup
        sx={{ alignSelf: "start", paddingInline: "6rem" }}
        className="tGroup"
        value={alignment}
        exclusive
      >
        <ToggleButton
          onClick={() => handleToggle("META")}
          className={alignment == "META" ? "activeTBtn" : "tBtn"}
          value="META"
        >
          META
        </ToggleButton>
        <ToggleButton
          onClick={() => handleToggle("SIMBA")}
          className={alignment == "SIMBA" ? "activeTBtn" : "tBtn"}
          value="SIMBA"
        >
          SIMBA
        </ToggleButton>
      </ToggleButtonGroup> */}
      <Line props={"90%"} />
      <Grid
        style={{
          background: "#94dbe0",
          width: "100%",
          padding: 0,
          margin: 0,
          borderRadius: "10px",
        }}
        container
      >
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              background: "#ffc000",
              width: "fit-content",
              height: "100%",
              borderRadius: "12px",
            }}
          >
            <img
              src={chimba}
              width="100%"
              height="100%"
              style={{
                padding: 0,
                margin: 0,
                objectFit: "fill",
                border: "none",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9} style={{ padding: "1rem" }}>
          <Box bgcolor="">
            <Typography color="white" fontWeight="bold" variant="h3">
              FIND YOUR SIMBA
            </Typography>
            <Typography
              color="white"
              variant="body2"
              style={{
                marginBlock: ".6rem",
              }}
            >
              You can now pair your BEANZ to your Azukis. Head over to your
              Collection, click on any Azuki, and then Pair BEANZ. Note: pairing
              does not update your metadata or change either NFT.
            </Typography>

            <button className="btns" style={{cursor:'pointer'}} onClick={connectWallet}>My Collection</button>
          </Box>
        </Grid>
      </Grid>
      {/* SIMBAssssss */}
      <Box width="fit-content" mt="2rem" overflowY="auto">
        <Grid
          container
          rowSpacing={3}
          columnSpacing={0}
          columnGap={0}
          // sx={{
          //   height:"55vh",
          //   overflowY:'auto'

          // }}
        >
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <SimbaCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  return (
    <div className="galleryMain">
      {/* For mobile version */}
      {/* {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))} */}
      <Container maxWidth="xxl">
        <Grid container>
          <Grid item md={4}>
            <div>{filters}</div>
          </Grid>
          { 
            nftType =="allNfts" ?
            (<Grid item md={8}>
              {nfts}
            </Grid>):
            (
              walletAddress !== ''?
              (
                <Grid item md={8} style={{fontSize:'1.5rem',color:'white',display:'flex',textAlign:'center',fontFamily: "monospace",}}>
                  <div style={{margin:'auto'}}>
                    <p style={{margin:"auto"}}>
                      you don't have any snow leopard
                    </p>
                    <p>
                      Address: {walletAddress}
                    </p>
                    <button className="btns">VIEW OPENSEA</button>
                  </div>
                </Grid>
              ):(
                <Grid item md={8} style={{fontSize:'1.5rem',color:'white',display:'flex',textAlign:'center',fontFamily: "monospace",}}>
                  <div style={{margin:'auto'}}>
                    <button className="btns" onClick={connectWallet}>Connect to Wallet</button>
                  </div>
                </Grid>
              )
            )
          } 
        </Grid>
      </Container>
    </div>
  );
}
