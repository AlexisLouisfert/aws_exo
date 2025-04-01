
manuel d'avant lancement en ligne de commande

instruction à faire dans l'ordre:

créer un user dans AWS IAM avec les permissions suivantes : 

- AWSLambda_FullAccess
- AmazonS3FullAccess
- AmazonDynamoDBFullAccess

créer un role dans AWS IAM se nommant rollYourRole avec les mêmes permissions que précédemment afin de pouvoir créer les fonctions lambda

node initAWS.js                     // pour la création des 2 tables Reservation et Annonce

node src/bucket.js                  // pour la création du bucket S3 (était prévu dans initAWS.js)

insérer 3 images dans le bucketS3 se nommant : maisona.png, maisone.png et maisonp.png 

node src/insertdataannonce.js       // insérer des données dans DynamoDB pour la table annonce
                            
npm install inquirer@7.0.0          //pour l’interface CLI
                                                                 
Création des 8 fonctions lambda :

aws lambda create-function --function-name getannonce --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler listAnnonce.handler --zip-file fileb://src/crudFiles/list/listAnnonce.zip --region eu-west-3   

aws lambda create-function --function-name getreservation --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler listReservation.handler --zip-file fileb://src/crudFiles/list/listReservation.zip --region eu-west-3                  

aws lambda create-function --function-name deletereservation --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler deleteReservation.handler --zip-file fileb://src/crudFiles/delete/deleteReservation.zip --region eu-west-3

aws lambda create-function --function-name deleteannonce --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler deleteAnnonce.handler --zip-file fileb://src/crudFiles/delete/deleteAnnonce.zip --region eu-west-3   

aws lambda create-function --function-name postreservation --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler createReservation.handler --zip-file fileb://src/crudFiles/create/createReservation.zip --region eu-west-3  

aws lambda create-function --function-name postannonce --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler createAnnonce.handler --zip-file fileb://src/crudFiles/create/createAnnonce.zip --region eu-west-3              

aws lambda create-function --function-name putannonce --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler updateAnnonce.handler --zip-file fileb://src/crudFiles/update/updateAnnonce.zip --region eu-west-3               

aws lambda create-function --function-name putreservation --runtime nodejs20.x --role arn:aws:iam::673444302333:role/rollYourRole --handler updateReservation.handler --zip-file fileb://src/crudFiles/update/updateReservation.zip --region eu-west-3   








