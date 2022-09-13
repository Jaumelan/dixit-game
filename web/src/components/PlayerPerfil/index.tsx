import { useState, useEffect, FC, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./styles";
import { UserAuth} from '../../context/AuthContext'
type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type PlayerPerfilProps = {
  closeGameRules: (d: boolean) => void;
};

const PlayerPerfil: FC<PlayerPerfilProps> = ({ closeGameRules }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeGameRules(false);
    });
  }, []);

  return (
    <S.Container>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              label="Avatar"
              {...a11yProps(0)}
              sx={{ fontSize: "2rem" }}
            />
            <Tab
              label="Perfil"
              {...a11yProps(1)}
              sx={{ fontSize: "2rem" }}
            />
          </Tabs>
          <AiOutlineCloseCircle
            size={29}
            onClick={() => closeGameRules(false)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <TabPanel value={value} index={0}>
          <S.RulesContainer>
            <img src={UserAuth().user?.profilePicture}></img>  
          </S.RulesContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <S.Pontos>
            <ul>
              <li><b>username:</b>{UserAuth().user?.username}</li>
              <li><b>email:</b>{UserAuth().user?.email}</li>
            </ul>
          </S.Pontos>
        </TabPanel>
      </Box>
    </S.Container>
  );
};

export default PlayerPerfil;
