import React, { useState, useEffect } from "react";
import "./FullContainer.scss";
import Box from "../../Components/Box/Box";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
const fullContainer = () => {
  //STATE
  const [allcolors, setAllcolors] = useState([]);
  // console.log(allcolors, "allcolors");
  //EFFECTS

  useEffect(() => {
    // toast.loading("Fetching Pixels for you!!");
    const addInterval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(addInterval);
    };
  }, [allcolors]);
  useEffect(() => {
    const id = toast.loading("Fetching Pixels for you...");
    fetchData(id);
  }, []);
  //FUNCTIONS
  const fetchData = (id) => {
    axios
      .get("/allColors.json")
      .then((res) => {
        const color = [];
        for (const obj in res.data) {
          color.push(res.data[obj].color);
        }
        if (id) {
          toast.update(id, {
            render: "Data Fetched",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
        }
        setAllcolors(color);
      })
      .catch((err) => {
        if (!err) {
          toast.error(
            "Cant reach to server!... Check Internet Connectivity ... !!"
          );
        } else {
          toast.error(err.message);
        }
        console.log(err);
      });
  };
  const changeColorHandler = (event, reqId) => {
    toast.success("fetching data!!!!");
    axios
      .get(`/allColors/${reqId}.json`)
      .then((res) => {
        const newObj = res.data;
        const time = newObj["time"];
        const diff = dayjs().diff(dayjs(time), "minute");
        if (diff > 5) {
          let color = prompt("Drop your hexcode here");
          if (!color) {
            toast.info("you changed your mind");
            return;
          }
          if (color[0] !== "#") {
            color = "#" + color;
          }
          const newColor = [...allcolors];
          newColor[reqId] = color;
          setAllcolors(newColor);
          newObj["time"] = new Date().toISOString();
          newObj["color"] = color;
          toast.info("writing your color pixels and adjusting pixels!!!...");
          axios
            .put(`/allColors/${reqId}.json`, newObj)
            .then((res) => {
              toast.success("Pixels are ready for you !....");
            })
            .catch((err) => {
              if (!err)
                toast.error(
                  "Can't reach to server!... please check connectivity"
                );
              else {
                toast.error(err.message);
              }
            });
        } else {
          toast.info(
            "Oops! That is a recently changed pixel.. You can change color of that pixel in " +
              (5 - diff) +
              " minutes"
          );
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err)
          toast.error("Cannot reach to server... please check connectivity");
        else toast.error(err.message);
      });
  };
  let boxes = [];
  for (let i = 0; i < allcolors.length; i++) {
    const value = i;
    boxes.push(
      <Box
        key={value}
        color={allcolors[value] ? allcolors[value] : "#ffffff"}
        clicked={(event) => {
          changeColorHandler(event, i);
        }}
      />
    );
  }

  //RENDER
  return <div className="full-container">{boxes}</div>;
};
export default React.memo(fullContainer);
