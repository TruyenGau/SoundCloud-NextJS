"use client";

import WareTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
const DetailTrackPage = (props: any) => {
  const { params } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  return (
    <div>
      <Container>
        <WareTrack />
      </Container>
    </div>
  );
};

export default DetailTrackPage;
