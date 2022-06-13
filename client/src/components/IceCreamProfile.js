import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/context";
import LoginModal from "./LoginModal";
import ErrorMessage from "./ErrorMessage";
import {GrMapLocation} from "react-icons/gr";

const IceCreamProfile = () => {
  const [iceCream, setIceCream] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);

  const { user, setUser, modal, setModal } = useContext(UserContext);

  const { _id } = useParams();
  const history = useHistory();

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
        console.log("Error caught:", error);
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

        if(data.status === 400) {
          setError(data);
          console.log(data);
          return;
        }

        handleAfterPublishReview();
        setReviewMessage("");  
        textAreaRef.current.value = "";
      })
      .catch((error) => {
        console.log("Error caught:", error);
      });
  };

  const handleTextAreaChange = (e) => {
    setError(null);
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
              <div>crèMTL Rating: {iceCream.rating}</div>
              <h2 className="icecream-description">
              "Una descrizione del gusto del gelato va qui. Da aggiungere in seguito."
              </h2>
              <div>Shop Name: {shop.name}</div>
              <div>{shop.address}</div>
              <div className="map-icon-container">
                View in map: 
                <GrMapLocation size={23} 
                  onClick={() => 
                    history.push(`/shop-locations?_id=${shop._id}&lng=${shop.coordinates[0]}&lat=${shop.coordinates[1]}`)}/>
              </div>
              <a href={shop.url}>{shop.url}</a>
              <FormWrapper id="form" onSubmit={handleSubmit}>
                <TextArea
                  ref={textAreaRef}
                  wrap="hard"
                  placeholder="Leave a review or comment about this flavour..."
                  onChange={(e) => {
                    handleTextAreaChange(e);
                  }}
                  error={error && error.error === "no-review"}
                ></TextArea>

                {/* error message component loads when error thrown from BE */}
                {error && <ErrorMessage error={error} />}

                <BottomAreaWrapper>
                    <StyledRating           
                      value={rating}
                      precision={0.5}
                      onChange={(e,newRating) => {
                        setError(null);
                        setRating(newRating);
                      }}
                      error={error && error.error === "no-rating"}
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

  .headingAndRating {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icecream-description {
    font-style: italic;
    text-align: center;
  }

  .map-icon-container {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
`;

const Image = styled.img`
  max-width: 400px;
  max-height: 500px;
  border-radius: 5px;
`;

const FormWrapper = styled.form`
  position: relative;
`;

const TextArea = styled.textarea`
  display: flex;
  border: ${p => p.error ? "5px solid red" : "1px solid pink"};
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
  padding: 10px;
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
    width: 100%;
  }

  .review-container {
    display: flex;
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

const StyledRating = styled(Rating)`
  border: ${p => p.error ? "5px solid red" : "none"};
`;
