"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const hashMouted = useHasMounted();
  if (!hashMouted) return <></>;
  console.log("check backend: ", process.env.NEXT_PUBLIC_BACKEND_URL);
  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
      >
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            volume={0.5}
            style={{ boxShadow: "unset", backgroundColor: "#f2f2f2" }}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
            onPlay={(e) => console.log("onPlay")}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>Truyền</div>
            <div style={{ color: "black" }}>who i am</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};
export default AppFooter;
