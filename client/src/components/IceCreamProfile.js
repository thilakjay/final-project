import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const IceCreamProfile = () => {
    const [iceCream, setIceCream] = useState(null);
    const [reviewMessage, setReviewMessage] = useState("");
    const [shop, setShop] = useState(null);
    
    const {_id} = useParams();

    const submitRef = useRef(null);
    const textAreaRef = useRef(null)
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
          .then(res => res.json())
          .then(data => {
            setIceCream(data.data.iceCream);
            setShop(data.data.shop);
          })
          .catch((error) => {
            console.log("Error message from /api/me/home-feed:", error);
            // setErrorMessage("A home feed error has occured.");
            // setErrorStatus(true);            
          })
    }    

    const submitReview = (review) => {
        console.log(review);
        fetch(`/api/ice-creams/${_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "name": "Tony Soprano",
                "review": review,
                "userRating": 5
            })
        })                
            .then(res => res.json())
            .then(data => {
                handleAfterPublishReview();         
            })
            .catch((error) => {
                console.log("Error message from /api/ice-creams/  :", error);
                // setErrorMessage("Oops, a minor hiccup.. our bad! Please refresh to view your review.");
                // setErrorStatus(true);               
            })
            textAreaRef.current.value = "";
    }

    const handleTextAreaChange= (e) => {
        setReviewMessage(e.target.value);

        if(textAreaRef.current.textLength <= 110) {
            submitRef.current.disabled = false;
            submitRef.current.style.backgroundColor = "hotpink";
            charCount.current.style.color = "darkgray";
        }else if(textAreaRef.current.textLength > 110 && textAreaRef.current.textLength <= 150) {
            charCount.current.style.color = "goldenrod";
            submitRef.current.disabled = false;
            submitRef.current.style.backgroundColor = "hotpink";
        }else if(textAreaRef.current.textLength > 150){
            submitRef.current.disabled = true;
            submitRef.current.style.backgroundColor = "hsl(266, 92%, 95%)";  //change colour later
            charCount.current.style.color = "red";            
        }          
    }     

    return (
        <>
        {(iceCream && shop) && (
            <Wrapper>
                <ImageAndInfoWrapper>
                    <ImageContainer>
                        <Image src={`/${iceCream.imageSrc}`} alt={iceCream.flavour} />                    
                    </ImageContainer> 

                    <InfoContainer>
                        <h2>{iceCream.flavour}</h2>
                        <div>Inserting ratings component here: Read-Only {iceCream.rating}</div>
                        <div>Inserting ratings component here: User-Controlled {iceCream.rating}</div>
                        <div>Google Rating: {shop.googleRating}</div>
                        <div>FB Rating:{shop.fbRating}</div>
                        <div>Shop Name: {shop.name}</div>
                        <div>Address: {shop.address}</div>
                        <div>Website: {shop.url}</div>
                        <TextAreaWrapper>
                            <div></div>
                            <TextArea 
                                ref={textAreaRef}
                                wrap="hard" 
                                placeholder="Leave a review or comment about this flavour..." 
                                onChange={(e) => {handleTextAreaChange(e)}} 
                            />
                        </TextAreaWrapper>
                        <BottomAreaWrapper>
                            <CharacterCount ref={charCount}>{(150 - reviewMessage.length)}</CharacterCount>
                            <Button 
                                ref={submitRef} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    submitReview(reviewMessage)
                                }}
                            >
                                Submit
                            </Button>
                        </BottomAreaWrapper>                     
                    </InfoContainer>                    
                </ImageAndInfoWrapper>

                <ReviewsWrapper>
                    <h2>Reviews</h2>
                    {iceCream.reviews.map((review, i) => 
                        <ReviewContainer key={i}>
                            <div className="user">{review.name}</div>
                            <div className="review">{review.review}</div>
                            <div className="rating">{review.userRating}</div>
                        </ReviewContainer>    
                    )}
                </ReviewsWrapper>

            </Wrapper>                
        )}        
        </>
    );

}
export default IceCreamProfile;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
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
    justify-content: flex-start;
    align-items: center;
    border: 1px solid hotpink;
    width: 500px;
    height: 500px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 500px;
    border: 1px solid green;
`;

const Image = styled.img`
    width: 400px;
`;

const TextAreaWrapper = styled.div`
`;

const TextArea = styled.textarea`
    display: flex;
    border: 1px solid lightgray;
    resize: none;
    outline: none;
    width: 100%;
    margin: 15px;
    height: 150px;
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
`;

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid red;
    width: 80%;
`;

const ReviewContainer = styled.div`
    display: flex;
    /* border: 1px solid red; */
    width: 80%;
    gap: 10px;

    .user {
        width: 20%;
        font-weight: bold;
    }

    .review {
        width: 60%;
        font-style: italic;
    }

    .userRating {
        width: 20%;
    }
`;


