import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form, Container, Row, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from '../components/RecipeOverview/RecipeList';
import RecipeService from '../services/RecipeService';

const Main = () => {

  const [recipes, setRecipes] = useState([]);

  const loadRecipesHandler = useCallback(async () => {
    let data = await RecipeService.getLimitedRecipes(3);
    setRecipes((prevState) => {
      return [...prevState, ...data.results];
    });
  }, []);

  const loadNextRecipesHandler = async () => {
    let data = await RecipeService.getNextRecipes(recipes.length, 3);
    setRecipes((prevState) => {
      return [...prevState, ...data.results];
    })
  }

  useEffect(() => {
    loadRecipesHandler();
  }, [loadRecipesHandler]);

  return (
      <div className="Main">
        <Row className="carousel-bug-fix">
          <Form className="search-form form-inline col-10 mx-auto p-4">
            <Form.Control className="rounded-0 col-10" type="search"
                          placeholder="Search"/>
            <Button className="rounded-0 search-button" type="submit">
              Search
            </Button>
          </Form>
          <Carousel className="dark-mood">
            <Carousel.Item className="c-item">
              <img
                  className="d-block w-100 c-image"
                  src="https://www.kudyznudy.cz/files/20/205481aa-f242-4859-b697-ed334069ec2f.jpg?v=20200829103738"
                  alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item className="c-item">
              <img
                  className="d-block w-100 c-image"
                  src="https://previews.123rf.com/images/nd3000/nd30001902/nd3000190200553/116721365-group-of-friends-having-a-barbecue-and-grill-party-in-nature.jpg"
                  alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item className="c-item">
              <img
                  className="d-block w-100 c-image"
                  src="https://previews.123rf.com/images/dar1930/dar19301307/dar1930130700287/21179555-summer-grill-party.jpg"
                  alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Row>


        <section className="p-4">
          <Container>
            <div className="text-center">
              <h1 className="p-4">Our recipes</h1>
              <div className="row justify-content-center mb-5">
                <p className="introduction-text col-8">Browse our full
                  collection
                  of inspiring recipe ideas
                  to cook at home.
                  It's a virtual world tour of cuisines, from the adventurous to
                  the familiar.
                  You'll find quick meals, family favourites and lighter dishes
                  too.
                </p>
              </div>
            </div>
            {<RecipeList items={recipes}/>}
            <div className="text-center">
              <Button onClick={loadNextRecipesHandler} className="rounded-0 search-button"
                      type="button">
                Load more
              </Button>
            </div>

          </Container>
        </section>
      </div>
  );
};

export default Main;
