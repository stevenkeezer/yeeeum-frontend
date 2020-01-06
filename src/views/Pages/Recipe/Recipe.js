import React, { Fragment, Suspense, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  CardBody,
  Card
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppHeader } from "@coreui/react";
import { useParams, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Comments from "./Comments/Comments";
import EditRecipe from "../Compose/EditRecipe";
import DeleteIcon from "@material-ui/icons/Delete";
import Truncate from "react-truncate";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import LikeButton from "./LikeButton";
import "./Recipe.css";
import Moment from "react-moment";
import "moment-timezone";

function Ingredient(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [toggleExpandIcon, setToggleExpandIcon] = useState(true);

  const getProducts = async query => {
    const API_KEY = "6e8e31d788654e8f995d0bc3d7d39662";

    const url = `https://api.spoonacular.com/food/products/search?apiKey=${API_KEY}&query=${query.ingredient}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      // setError(true);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    getProducts(props.ingredient);
  };

  return (
    <div className="col-lg-12">
      <div className="row">
        {toggleExpandIcon ? (
          <ControlPointIcon
            onClick={() => {
              toggle();
              setToggleExpandIcon(!toggleExpandIcon);
            }}
            style={{ color: "#00a287", marginLeft: "2%", marginTop: "-2px" }}
            className="pr-2 expand-products-button"
          />
        ) : (
          <RemoveCircleOutlineIcon
            onClick={() => {
              toggle();
              setToggleExpandIcon(!toggleExpandIcon);
            }}
            style={{ color: "#00a287", marginLeft: "2%", marginTop: "-2px" }}
            className="pr-2 expand-products-button"
          />
        )}
        <div className="recipe-text">{props.ingredient.amount} </div>
        <span className="pl-1 recipe-text" style={{ fontWeight: "bold" }}>
          {props.ingredient.ingredient}
        </span>
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody
            className="row"
            style={{ width: "100%!important", marginRight: "0px" }}
          >
            {products &&
              products.map(product => {
                return (
                  <div className="col-3 col-lg-2">
                    <img
                      width="100px"
                      style={{ minWidth: "60px" }}
                      className="img-fluid"
                      src={product.image}
                    ></img>
                    <Truncate
                      width={100}
                      className="sub-article-title "
                      lines={1}
                      style={{ fontSize: ".8rem" }}
                      ellipsis={<span></span>}
                    >
                      <span>{product.title}</span>
                    </Truncate>
                    <br></br>
                    <div className="text-center buy-button mx-auto">
                      <Link style={{ color: "#00a287" }}>Buy</Link>
                    </div>
                  </div>
                );
              })}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default function Recipe(props) {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [editable, setEditable] = useState(false);
  const [recipeImages, setRecipeImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [toggleIcon, setToggleIcon] = useState(true);

  let { id } = useParams();

  let history = useHistory();

  const toggle = () => setModal(!modal);

  const userProfile = id => {
    history.push(`/user/${id}`);
  };
  const get_post = async () => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(process.env.REACT_APP_BURL + "post", options);
    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    }
  };

  const get_comments = async () => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(
      process.env.REACT_APP_BURL + "get_comments",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  const get_recipe_images = async () => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(
      process.env.REACT_APP_BURL + "get_recipe_images",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setRecipeImages(data);
      setSpinner(false);
    }
  };

  const delete_recipe = async () => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(
      process.env.REACT_APP_BURL + "delete_recipe",
      options
    );
    if (response.ok) {
      const data = await response.json();
      history.push("/");
      props.handleToast();
    }
  };

  const delete_comment = async id => {
    const recipeId = {
      comment_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(
      process.env.REACT_APP_BURL + "delete_comment",
      options
    );
    if (response.ok) {
      const data = await response.json();
      if (data.status === true) {
        get_comments();
      }
    }
  };

  useEffect(() => {
    get_recipe_images();
    get_post();
    get_comments();
  }, []);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  const pageVariants = {
    initial: {
      // opacity: 0
      // : "-100vw"
    },
    in: {
      // opacity: 1
      // x: 0
    },
    out: {
      // opacity: 0
      // x: "100vw",
      // scale: 1
    }
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.8,
    scale: 0.8
  };

  if (spinner) {
    return (
      <main className="main">
        <div className="d-flex justify-content-center">
          <CircularProgress
            style={{ marginTop: "13%", color: "#00a287" }}
          ></CircularProgress>
        </div>
      </main>
    );
  }

  return (
    <motion.div
      exit="out"
      animate="in"
      initial="initial"
      variants={pageVariants}
      transition={pageTransition}
    >
      <main className="main">
        <div class="row mx-auto recipe-container-top">
          <div class="col-md-7 col-sm-12 col-xl-6 mr-auto order-md-2">
            <div style={{ padding: "0px" }} class="card card-body mt-5">
              {" "}
              {recipeImages && recipeImages.length < 1 && (
                <img
                  className="image-container"
                  alt="blah"
                  style={{
                    height: "auto"
                  }}
                  src="/assets/img/food.png"
                ></img>
              )}
              <>
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  className="justify-content-center  carousel img-fluid"
                >
                  {recipeImages &&
                    recipeImages.map(img => {
                      return (
                        <div className="d-flex">
                          <img
                            className="img-fluid recipe-img "
                            alt="blah"
                            style={{
                              width: "100%"
                              // height: "auto"
                            }}
                            src={`https://yeeeum.s3-us-west-1.amazonaws.com/${img.img_url}`}
                          ></img>
                        </div>
                      );
                    })}
                </Carousel>
              </>
            </div>
          </div>
          <div class="col-md-4 col-xl-6 ml-auto order-md-1 my-auto recipe-header">
            {recipe && (
              <div
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                class="card card-body"
              >
                {" "}
                <h1 className="recipe-title mt-2">{recipe.title}</h1>
                <div
                  style={{
                    color: "grey",
                    textTransform: "uppercase"
                  }}
                  className="mr-auto recipe-text"
                >
                  {recipe.user_name}
                </div>
                <div className="mt-4 recipe-description">
                  {recipe.description}
                </div>
                <div className="ml-3 mt-5">
                  <LikeButton
                    className="ml-auto"
                    recipes={recipe}
                    setRecipe={setRecipe}
                  />
                </div>
                {props.user && recipe && props.userId === recipe.user_id && (
                  <div className="row ml-auto pr-3">
                    <div
                      href="#"
                      className="delete-mobile mt-2 mr-2"
                      onClick={toggle}
                    >
                      <DeleteIcon className="my-delete" />
                    </div>
                    <div>
                      <div
                        href="#"
                        class="edit-mobile mt-2"
                        onClick={() => {
                          setEditable(!editable);
                          setToggleIcon(!toggleIcon);
                        }}
                      >
                        {toggleIcon ? (
                          <EditIcon className="my-edit" />
                        ) : (
                          <CloseIcon className="my-edit" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div class="col-12 col-lg-9 col-md-8 mx-auto">
          <hr
            className="mx-auto"
            style={{
              width: "100%",
              borderTop: "0.1px solid #e3e3e3!important",
              marginTop: "8vw"
            }}
          ></hr>
        </div>
        <div className="container-fluid">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 mx-auto pt-4">
            {!editable && (
              <>
                {recipe ? (
                  <ul style={{ padding: "0px" }}>
                    <h3 className="pb-3">Ingredients</h3>
                    {recipe.ingredients.map((ingredient, index) => {
                      return (
                        <ul
                          className="pt-1 pb-1"
                          style={{ paddingLeft: "0px" }}
                        >
                          <div className="row">
                            <Ingredient ingredient={ingredient} />
                          </div>
                        </ul>
                      );
                    })}
                  </ul>
                ) : (
                  <ul color="white"></ul>
                )}
              </>
            )}
          </div>
          {!editable && (
            <>
              {recipe ? (
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 mx-auto pt-3 mb-5">
                  <h3 className="mb-4">Directions</h3>
                  <div
                    className="recipe-text"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {recipe.directions}
                  </div>
                </div>
              ) : (
                <ul color="white">.</ul>
              )}
            </>
          )}
          {!editable && (
            <>
              <div
                style={{ padding: "0px" }}
                className="col-xl-8 col-lg-8 col-sm-10 col-md-10 pb-1 mx-auto"
              >
                <h3 className="pl-3">
                  Reviews{" "}
                  <span
                    className="recipe-text"
                    style={{
                      fontSize: "60%",
                      fontWeight: "bold"
                    }}
                  >
                    ({comments.length})
                  </span>
                </h3>

                <Comments
                  props={props}
                  get_comments={get_comments}
                  userImg={props.userImg}
                  fbId={props.fbId}
                />
              </div>
              <div className="col-xl-8 col-lg-8 col-sm-10 col-md-10 mx-auto mt-5">
                {comments.map(comment => {
                  return (
                    <>
                      {!comment.deleted && (
                        <div className="   mx-auto">
                          <section id="app" class="comments">
                            <article>
                              {!comment.img && comment.fb_img && (
                                <img
                                  alt="profilepicture"
                                  className="profile-photo"
                                  src={`https://graph.facebook.com/${comment.fb_img}/picture?type=square`}
                                ></img>
                              )}

                              {comment.img && (
                                <img
                                  alt="profilepicture"
                                  className="profile-photo"
                                  src={`https://yeeeum.s3-us-west-1.amazonaws.com/${comment.img}`}
                                ></img>
                              )}

                              {!comment.img && !comment.fb_img && (
                                <img
                                  alt="profilepicture"
                                  className="profile-photo"
                                  src={"/assets/img/default.png"}
                                ></img>
                              )}
                              <div className="row">
                                <h5
                                  className="comment-user-name"
                                  onClick={() => {
                                    userProfile(comment.user_id);
                                  }}
                                >
                                  {comment.user_name}
                                </h5>

                                <time className="mt-1">
                                  <Moment fromNow>{comment.created}</Moment>
                                </time>
                              </div>

                              {comment.user_id === props.userId && (
                                <span className="text-right float-right">
                                  <button
                                    onClick={() => delete_comment(comment.id)}
                                    style={{
                                      border: "none",
                                      marginTop: "-30px",
                                      outline: "none",
                                      color: "grey"
                                    }}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </span>
                              )}
                              <p>{comment.body}</p>
                            </article>
                          </section>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {editable && (
          <EditRecipe
            setEditable={setEditable}
            get_post={get_post}
            setToggleIcon={setToggleIcon}
          />
        )}
        {recipe && props.user && props.userId === recipe.user_id && (
          <>
            <div className="row">
              <div className="col-8">
                <div href="#" class="delete" onClick={toggle}>
                  <DeleteIcon className="my-delete" />
                </div>
                <div>
                  <div
                    href="#"
                    class="edit"
                    onClick={() => {
                      setEditable(!editable);
                      setToggleIcon(!toggleIcon);
                    }}
                  >
                    {toggleIcon ? (
                      <EditIcon className="my-edit" />
                    ) : (
                      <CloseIcon className="my-edit" />
                    )}
                  </div>
                </div>
              </div>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="delete-modal" toggle={toggle}>
                  Delete
                </ModalHeader>
                <ModalBody className="delete-modal-body">
                  Do you want to remove this recipe?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    className="delete-modal"
                    onClick={() => delete_recipe()}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    color="secondary"
                    className="delete-modal"
                    onClick={toggle}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </>
        )}
      </main>
    </motion.div>
  );
}
