import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Grow } from "@mui/material";

const Alerts = ({ alerts, fade, setFade, setDisplayAlert }) => {
  // console.log(alerts);
  const close = () => {
    setFade((fade) => !fade);
    setDisplayAlert(false);
    window.location.reload();
  };

  return (
    <Grow in={true}>
      <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
        <Alert value={fade} variant="outlined" severity={"error"}>
          <strong
            style={{
              margin: "3%",
              color: "rgb(0,0,0)",
            }}
          >
            {alerts.message === "unable to get doctor"
              ? "Doctor is not available"
              : alerts.message}
          </strong>
          <div className="dc-form-submit">
            <input
              type="Submit"
              id="alert-submit"
              style={{}}
              onClick={close}
              value="OK"
            />
          </div>
        </Alert>
      </Stack>
    </Grow>
  );
};

export default Alerts;
