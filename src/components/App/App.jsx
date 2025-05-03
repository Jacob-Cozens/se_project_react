import { useState, useEffect, act } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import { defaultClothingItems } from "../../utils/constants";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItems, deleteItem } from "../../utils/Api";
import auth from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../context/CurrentUserContext";

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatrueUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleToggleSwitchChange = () => {
    setCurrentTemperatrueUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSubmit = (request) => {
    return request().then(closeActiveModal).catch(console.error);
  };

  const handleAddItemModalSubmit = (item) => {
    const addItemRequest = () => {
      return addItems(item).then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        return newItem;
      });
    };
    handleSubmit(addItemRequest).catch(console.error);
  };

  const handleCardDelete = (selectedCard) => {
    deleteItem(selectedCard)
      .then(() => {
        const newClothingItems = clothingItems.filter((cards) => {
          return cards._id !== selectedCard._id;
        });
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = ({ email, password }) => {
    const loginRequest = () => {
      return auth.authorize({ email, password }).then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
        return auth.getContent(token).then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        });
      });
    };
    handleSubmit(loginRequest);
  };

  const handleRegister = ({ email, password, name, imageUrl }) => {
    const registerRequest = () => {
      return auth
        .register({ email, password, name, imageUrl })
        .then((newUser) => {
          console.log(newUser);
          handleLogin({ email, password });
        });
    };
    handleSubmit(registerRequest);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleCardClick={handleCardClick}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              handleCloseClick={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              selectedCard={selectedCard}
              handleCloseClick={closeActiveModal}
              onDelete={handleCardDelete}
            />
            <LoginModal
              handleCloseClick={closeActiveModal}
              onLogin={handleLogin}
              activeModal={activeModal}
            />
            <RegisterModal
              handleCloseClick={closeActiveModal}
              onRegister={handleRegister}
              activeModal={activeModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
