import "./App.css";
import React, { useState, useEffect } from "react";
import detailsJSON from "../../data/details-1.json";
import TagsInput from "./TagsInput";
import Pricing from "./Pricing";
import PrepTime from "./PrepTime";
import Skill from "./Skill";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Search() {
  const [tags, setTags] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [priceInputValue, setpriceInputValue] = useState(1);

  const [prepTime, setPrepTime] = useState(50);
  const [skillLevel, setSkillLevel] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);

  const [value, setValue] = useState(0);

  const [showFilteredresults, setShowFilteredresults] = useState(searchResults);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {

    const filteredResults = details
        
      .filter(
        (detail) =>
          parseInt(priceInputValue) * 100 < detail.pricePerServing &&
          detail.pricePerServing < (parseInt(priceInputValue) + 1) * 100
      )
        .filter(
          (detail) =>
            (parseInt(prepTime) + 1) * 30 >
            parseInt(detail.preparationMinutes) +
            parseInt(detail.cookingMinutes)
        )
        .filter(
          (detail) =>
            (parseInt(skillLevel) + 1) * 10 > detail.extendedIngredients.length
        )
        .filter(
          (detail) =>
            detail.spoonacularScore <= (value * 20 + 10) &&
            detail.spoonacularScore >= value * 19
        )
    
        setSearchResults(filteredResults)
    
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const details = detailsJSON;
  const recipes = recipesJSON;
  // console.log(details)
  // console.log(recipes)

  useEffect(() => {
    if (tags.length) {
      let next = [];
      details.forEach((item) => {
        if (
          tags.reduce(
            (acc, curr) => acc && item.title.toLowerCase().includes(curr),
            true
          )
        ) {
          next.push(item);
        }
      });
      setSearchResults(next);
    } else {
      setSearchResults(details);
    }
  }, [tags]);

  

  return (
    <div className="Search">
      <TagsInput tags={tags} setTags={setTags}></TagsInput>

      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Refine ^
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Pricing setpriceInputValue={setpriceInputValue} />
        <PrepTime setPrepTime={setPrepTime} />
        <Skill setSkillLevel={setSkillLevel} />

        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Reviews</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <button onClick={handleApply} >Apply</button>
      </Popover>

      {searchResults.map((item) => (
          <>
            <div>{item.title}</div>
            <img src={item.image} />
          </>
        ))}
    </div>
  );
}

export default Search;
