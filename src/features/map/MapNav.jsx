import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import search from "@/assets/search.svg";
import place from "@/assets/place.svg";
import NavMenu from "@/components/header/NavMenu";

const style = {
  container:
    "container mx-auto px-5 flex flex-col items-center justify-between py-2 md:flex-row ",
  logoContainer:
    "flex w-full items-center justify-between px-5 pb-2 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.1)] backdrop-blur-[5px] md:w-auto md:px-0 md:pb-0 md:shadow-none md:backdrop-blur-none",
  menu: "hidden cursor-pointer md:block lg:hidden",
  formContainer:
    "flex w-full items-center gap-2 px-5 py-3 md:w-auto md:px-0 md:py-0",
  form: "relative flex h-10 lg:h-12 w-full items-center justify-between rounded-3xl border border-[#D9D9D9] py-1 pl-6 pr-1 focus-within:border focus-within:border-main-500 focus-visible:outline-none xl:w-[636px] ",
  input:
    "w-full text-black placeholder:text-[#B7B7B7] focus-visible:outline-none",
  searchIcons: "rounded-full bg-main-600 p-2",
  placeBtn: "btn flex h-10 items-center text-nowrap px-3 lg:gap-1 lg:px-4",
  nav: "hidden items-center justify-between gap-6 lg:flex text-nowrap",
  mapAfter:
    "after:content text-main-500 after:absolute after:mt-1 after:w-[64px] after:border-b-2 after:border-main-500",
};

const SuggestedTags = ({ filteredTags, handleSelect }) => {
  return (
    <ul
      style={{
        listStyleType: "none",
        maxHeight: "150px",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
      className="m-0 w-full rounded-b-xl bg-white p-0 drop-shadow-lg"
    >
      {filteredTags.slice(0, 3).map((tag) => (
        <li
          key={tag}
          onClick={() => handleSelect(tag)}
          className="bg-white p-[12px] text-[#6F6F6F] hover:bg-main-100 hover:text-black"
          style={{
            cursor: "pointer",
          }}
          onMouseDown={(e) => e.preventDefault()} // 避免 onBlur 觸發導致選項消失
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

SuggestedTags.propTypes = {
  filteredTags: PropTypes.array,
  handleSelect: PropTypes.func,
};

function MapNav({
  handleLocateUser,
  searchKeyWords,
  setSearchKeyWords,
  handleSearchStations,
  availableTags,
  showSuggestedTags,
  setShowSuggestedTags,
}) {
  const [filteredTags, setFilteredTags] = useState([]); //儲存被篩選出的tags

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchKeyWords(value);

    if (value) {
      // 過濾符合的選項
      setFilteredTags(
        availableTags.filter((tag) =>
          tag.toLowerCase().includes(value.toLowerCase()),
        ),
      );

      setShowSuggestedTags(true);
    } else {
      setFilteredTags([]);
      setShowSuggestedTags(false);
    }
  };

  const handleSelect = (tag) => {
    setSearchKeyWords(tag);
    setShowSuggestedTags(false);
  };

  return (
    <div className="relative">
      <div className="bg-[rgba(255,255,255,0.75)]">
        <div className={style.container}>
          <div className={style.logoContainer}>
            <Link to="/">
              <picture>
                <source
                  srcSet={logoSm}
                  alt="紙箱轉運站"
                  media="(max-width: 992px)"
                  height="40"
                  width="168"
                />
                <img src={logo} alt="紙箱轉運站" height="56" width="235" />
              </picture>
            </Link>
            <div className="md:hidden">
              <NavMenu />
            </div>
          </div>
          <div className={style.formContainer}>
            <form
              className={style.form}
              onSubmit={(e) => handleSearchStations(e)}
            >
              <input
                className={style.input}
                placeholder="輸入地標 或 街道名稱"
                value={searchKeyWords}
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">
                <img src={search} alt="搜尋" className={style.searchIcons} />
              </button>
              {/* 搜尋建議 */}
              <div className="absolute left-0 top-[135%] z-[1000] flex w-full justify-center">
                {showSuggestedTags && filteredTags.length > 0 && (
                  <SuggestedTags
                    filteredTags={filteredTags}
                    handleSelect={handleSelect}
                  ></SuggestedTags>
                )}
              </div>
            </form>
            <button className={style.placeBtn}>
              <img src={place} alt="place" className="max-w-max" />
              <p className="fs-7 lg:fs-6" onClick={handleLocateUser}>
                定位
              </p>
            </button>
          </div>
          <div className="hidden md:block">
            <NavMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

MapNav.propTypes = {
  handleLocateUser: PropTypes.func,
  searchKeyWords: PropTypes.string,
  setSearchKeyWords: PropTypes.func,
  handleSearchStations: PropTypes.func,
  availableTags: PropTypes.array,
  showSuggestedTags: PropTypes.bool,
  setShowSuggestedTags: PropTypes.func,
};

export default MapNav;
