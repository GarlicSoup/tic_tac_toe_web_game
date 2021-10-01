<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>

        <?php include "header.html" ?>

        <?php 
            $title = "Basic calculator";
            $author = "Hieu Le";
            $wordCount = 400;
            include "article-header.php"
        ?>

        <p>Calculator</p>
        <form action="site.php" method="post">
            First Numer: <input type="number" step="0.1" name="num1"> <br>
            OP: <input type="text" name="op"> <br>
            Second Numer: <input type="number" name="num2"> <br>
            <input type="submit">
        </form>

        <!-- <?php
            // test for and while loops
            $index = 1;
            while ($index <= 5){
                echo "$index <br>";
                $index++;
            }
            $luckyNumbers = array(4, 8, 14, 16, 23, 42);
            for ($i=1; $i<count($luckyNumbers); $i++) {
                echo "$luckyNumbers[$i] <br>";
            }

        ?> -->

        <?php 
        // class practice
            class Book{
                var $title;
                var $author;
                var $pages;
                private $genre;

                function __construct($aTitle, $aAuthor, $aPages, $aGenre){
                    $this->title = $aTitle;
                    $this->author = $aAuthor;
                    $this->pages = $aPages;
                    $this->genre = $aGenre;
                }

                function isThickBooks(){
                    if ($this->pages > 500) {
                        echo "is a thick book<br>";
                        return true;
                    } else {
                        echo "is not a thick book<br>";
                        return false;
                    }
                }

                function getGenre(){
                    return $this->genre;
                }

                function setGenre($aGenre){
                    $this->genre = $aGenre;
                }
            }

            $book1 = new Book("Harry Potter", "JK Rowling", 400, "Adventure");
            $book2 = new Book("Lord of the Rings", "Tolkien", 700, "Adventure");

            echo $book2->getGenre();
            $book2->isThickBooks();

        ?>

        <?php
            // inheritance practice
            class Chef{
                function makeChicken(){
                    echo "making chicken<br>";
                }
                function makeSalad(){
                    echo "making salad<br>";
                }
                function makeSpecialDish(){
                    echo "making special dish<br>";
                }
            }

            class ItalianChef extends Chef{
                function makeSpecialDish(){
                    echo "making chicken parm<br>";
                }
            }

            $chef = new Chef();
            $chef->makeChicken();
            $chef->makeSpecialDish();

            $italianChef = new ItalianChef();
            $italianChef->makeChicken();
            $italianChef->makeSpecialDish();
        ?>
        
        <?php include "footer.html" ?>
    </body>
</html>