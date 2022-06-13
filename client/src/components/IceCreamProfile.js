import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/context";
import LoginModal from "./LoginModal";

const IceCreamProfile = () => {
  const [iceCream, setIceCream] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [shop, setShop] = useState(null);

  const { user, setUser, modal, setModal } = useContext(UserContext);

  const { _id } = useParams();

  const submitRef = useRef(null);
  const textAreaRef = useRef(null);
  const charCount = useRef(null);

  useEffect(() => {
    const fetchIceCream = async () => {
      const data = await fetch(`/api/ice-creams/${_id}`);
      const json = await data.json();
      setIceCream(json.data.iceCream);
      setShop(json.data.shop);
    };
    fetchIceCream();
  }, []);

  const handleAfterPublishReview = () => {
    fetch(`/api/ice-creams/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setIceCream(data.data.iceCream);
        setShop(data.data.shop);
      })
      .catch((error) => {
        console.log("Error message from /api/me/home-feed:", error);
        // setErrorMessage("A home feed error has occured.");
        // setErrorStatus(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!user) {
      setModal(true);
      return <LoginModal />;  
    }

    fetch(`/api/ice-creams/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        review: reviewMessage,
        userRating: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleAfterPublishReview();
      })
      .catch((error) => {
        console.log("Error message from /api/ice-creams/  :", error);
        // setErrorMessage("Oops, a minor hiccup.. our bad! Please refresh to view your review.");
        // setErrorStatus(true);
      });

    setReviewMessage("");  
    textAreaRef.current.value = "";
  };

  const handleTextAreaChange = (e) => {
    setReviewMessage(e.target.value.trim());

    if (textAreaRef.current.textLength <= 110) {
      submitRef.current.disabled = false;
      // submitRef.current.style.backgroundColor = "hotpink";
      charCount.current.style.color = "darkgray";
    } else if (
      textAreaRef.current.textLength > 110 &&
      textAreaRef.current.textLength <= 150
    ) {
      charCount.current.style.color = "goldenrod";
      submitRef.current.disabled = false;
      // submitRef.current.style.backgroundColor = "hotpink";
    } else if (textAreaRef.current.textLength > 150) {
      submitRef.current.disabled = true;
      // submitRef.current.style.backgroundColor = "rgb(255,	105, 180, 0.5)"; //change colour later
      charCount.current.style.color = "red";
    }
  };

  return (
    <>
      {iceCream && shop && (
        <Wrapper>
          <ImageAndInfoWrapper>
            <ImageContainer>
              <Image src={`/images/icecreams/${iceCream.imageSrc}`} alt={iceCream.flavour} />
            </ImageContainer>

            <InfoContainer>
              <div className="headingAndRating">
                <h1>{iceCream.flavour}</h1>
                <Rating value={iceCream.rating} precision={0.5} readOnly />
              </div>
              <h2 className="icecream-description">
              "Una descrizione del gusto del gelato va qui. Da aggiungere in seguito.""
              </h2>
              <div>CrèM-T-L Rating: {iceCream.rating}</div>
              <div>Shop Name: {shop.name}</div>
              <div>{shop.address}</div>
              <a href={shop.url}>{shop.url}</a>
              <FormWrapper id="form" onSubmit={handleSubmit}>
                <TextArea
                  ref={textAreaRef}
                  wrap="hard"
                  placeholder="Leave a review or comment about this flavour..."
                  onChange={(e) => {
                    handleTextAreaChange(e);
                  }}
                  required
                ></TextArea>
                {/* <div className="required"></div> */}
                <BottomAreaWrapper>
                  <Rating
                    value={rating}
                    precision={0.5}
                    onChange={(e,newRating) => {
                      setRating(newRating);
                    }}
                    required
                  />
                  <CharacterCount ref={charCount}>
                    {150 - reviewMessage.length}
                  </CharacterCount>
                  <Button
                    form="form"
                    ref={submitRef}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleSubmit(reviewMessage);                 
                    // }}
                  >
                    Submit
                  </Button>
              </BottomAreaWrapper>                
              </FormWrapper>
            </InfoContainer>
          </ImageAndInfoWrapper>

          <ReviewsWrapper>
            <h2>Reviews</h2>
            <div className="reviews-container">
            {iceCream.reviews.map((review, i) => (
              <div className="review-container" key={i}>
                <div className="user">{review.name}</div>
                <div className="review">{review.review}</div>
                <div className="rating">
                  <Rating
                    size="small"
                    value={review.userRating}
                    precision={0.5}
                    readOnly
                  />
                </div>
              </div>
            ))}
            </div>
          </ReviewsWrapper>
        </Wrapper>
      )}
    </>
  );
};
export default IceCreamProfile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin: 50px 0;
  /* border: 2px black solid; */
  /* height: 95vh; */
`;

const ImageAndInfoWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid hotpink; */
  width: 500px;
  height: 500px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 500px;
  height: 500px;
  /* border: 1px solid green; */

  .headingAndRating {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icecream-description {
    font-style: italic;
    text-align: center;
  }
`;

const Image = styled.img`
  width: 400px;
  max-height: 500px;
  border-radius: 5px;
`;

const FormWrapper = styled.form`

  /* &:required {
      position: relative;
      content: "Please leave a commit before submitting.";
      top: -100px;
      left: -205px;
      font-size: 12px;
      color: red;
      font-weight: bold;
    } */
`;

const TextArea = styled.textarea`
  display: flex;
  border: 1px solid pink;
  border-radius: 3px;
  resize: none;
  outline: none;
  width: 250px;
  height: 150px;
  margin: 10px;
  padding: 5px;
  font-size: 18px;
  flex-wrap: wrap;

`;
const BottomAreaWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  /* margin: 10px; */
  padding: 10px;
  /* border-bottom: 15px solid lightgray; */
  /* width: 100%; */
`;

const CharacterCount = styled.span`
  color: darkgray;
`;

const Button = styled.button`
  background: hotpink;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  cursor: pointer;

  &:disabled {
    background-color: rgb(255,	105, 180, 0.5);
  }
`;

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 30px;

  h2 {
    border-top: 3px solid pink;
    padding: 20px 0;
  }

  .reviews-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    /* border: 1px solid red; */
    width: 100%;
  }

  .review-container {
    display: flex;
    /* border: 1px solid red; */
    width: 80%;
    gap: 2rem;

    .user {
      width: 15%;
      font-weight: bold;
    }

    .review {
      width: 60%;
      font-style: italic;
    }

    .userRating {
      width: 20%;
    }
}

`;

// const ReviewContainer = styled.div`
//   display: flex;
//   /* border: 1px solid red; */
//   width: 80%;
//   gap: 10px;

//   .user {
//     width: 20%;
//     font-weight: bold;
//   }

//   .review {
//     width: 60%;
//     font-style: italic;
//   }

//   .userRating {
//     width: 20%;
//   }
// `;
