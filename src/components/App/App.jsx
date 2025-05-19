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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getItems,
  addItems,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import auth from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../context/CurrentUserContext";

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
    handleSubmit(addItemRequest);
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
        console.log(res);
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
        .register({ email, password, name, avatar: imageUrl })
        .then((newUser) => {
          console.log(newUser);
          return handleLogin({ email, password });
        });
    };
    handleSubmit(registerRequest);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const updateRequest = () => {
      return updateProfile({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      });
    };
    handleSubmit(updateRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      return addCardLike({ id, isLiked })
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      return removeCardLike({ id, isLiked })
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
  };

  const onRegisterOpen = () => {
    setActiveModal("register");
  };

  const onLoginOpen = () => {
    setActiveModal("login");
  };

  const onUpdateProfileOpen = () => {
    setActiveModal("edit");
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
        setClothingItems(
          data
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
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
                onLogin={onLoginOpen}
                onRegister={onRegisterOpen}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
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
                        onUpdateProfile={onUpdateProfileOpen}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                        isLoggedIn={isLoggedIn}
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
              isOpen={activeModal === "login"}
              onRegisterOpen={onRegisterOpen}
            />
            <RegisterModal
              handleCloseClick={closeActiveModal}
              onRegister={handleRegister}
              isOpen={activeModal === "register"}
              onLoginOpen={onLoginOpen}
            />
            <EditProfileModal
              handleCloseClick={closeActiveModal}
              onUpdateProfile={handleUpdateProfile}
              isOpen={activeModal === "edit"}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
