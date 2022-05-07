//Fonction qui effectue un tirage simple
function tirage() {
	
	
	grille = CreationGrille()
	verif=verification()
	resultat= Resultat()
	
}

//Fonction de tirage aléatoire
function TirageAleatoire(){
	semaine=0
	année=0
	var resultat=0;
	var gagné=parseInt(document.getElementById("choix-nombre").value);
	grille = CreationGrille()
	verif = verification()
	
	// Si il n'y a pas de problème de saisie on peux lancer la suite 
	if (verif!=1){
		while (resultat!=gagné){
			semaine=semaine+1
		//Pour suivre dans la console si tout se passse bien
		if ((semaine%1000000)===0){
			console.log(semaine)
		}
		resultat = Resultat()	
	}
	//Calcul des semaines en années
	année=Math.trunc(semaine/52)
	var argent = semaine*2
	if (gagné>1){
		document.querySelector("#res").innerHTML = gagné+" bon numéros sont sortie au bout de "+semaine+" tirages soit "+année+" années à hauteur de 1 tirage par semaine. Vous avez dépensé "+argent+" euros"
	}
	else {
		document.querySelector("#res").innerHTML = gagné+" bon numéro est sortie au bout de "+semaine+" tirages. Vous avez dépensé "+argent+" euros"

	}	
}


}






//Fonction qui met les numéro de la grille dans un tableau
function CreationGrille(){

	let grille=[];

	grille.push(parseInt(document.getElementById('n1').value))
	grille.push(parseInt(document.getElementById('n2').value))
	grille.push(parseInt(document.getElementById('n3').value))
	grille.push(parseInt(document.getElementById('n4').value))
	grille.push(parseInt(document.getElementById('n5').value))
	NumeroChance=parseInt(document.getElementById('n6').value)

	return grille
}

//Fonction qui vérifie les entrées de la grille 
function verification(){

	grille = CreationGrille()


	for (let i=1;i<7;i++){
		num = document.getElementById('n'+i).value
		//Si le champs est vide
		if ( !num.replace(/\s+/, '').length) {
			alert( "Un ou plusieurs champs sont vide !" )
			return 1;

		}

		else if ( num<1 || num>49 ) {
			alert( "Le numéro chance doit être compris entre 1 et 49")
			return 1;

		}
		else if (NumeroChance>10 || NumeroChance<1){
			alert("Le numéro chance doit être compris entre 1 et 10")
			return 1;
		}
	}
	//Vérification qu'il n'y à pas deux chiffres identiques
	for (let a=0;a<5;a++){
		for (let e=1;e<5;e++){
			if (grille[a]===grille[a+e]){
				alert("On ne peux pas mettre deux chiffres identiques")
				return 1;
			}
		}
	}
}




//Fonction qui calcul le nombre de bon numéro 
function Resultat(){

	var resultat=0;
	var gagné=6;
	let tableau =[];
	var aleatoire=0;
	const str1 = 'Vous avez perdu avec';
	let chance=Math.floor(Math.random() * Math.floor(10)+1);
	somme=0

	if (verif!=1){
		//Génération aléatoire des numéros 
		for (let i = 0;i<5;i++){
			aleatoire = Math.floor(Math.random() * Math.floor(49)+1);
			tableau.push(aleatoire)
		}
		document.getElementById("num1").value = tableau[0]
		document.getElementById("num2").value = tableau[1]
		document.getElementById("num3").value = tableau[2]
		document.getElementById("num4").value = tableau[3]
		document.getElementById("num5").value = tableau[4]
		document.getElementById("num6").value = chance

		//Verifie si il y à des bon numéros
		for (let a=0;a<5;a++){
			for (let i=0;i<5;i++){
				if (grille[a]===tableau[i]){
					resultat=resultat+1;
					somme=somme+1
					break;
				}
			}
		}
		//Vérifie si le numéro chance correspond
		if (NumeroChance==chance){
			resultat=resultat+1
			somme=somme+1
		}
		if (resultat==gagné){
			document.querySelector("#res").innerHTML = "Vous avez gagné"
		}
		else {
			somme = str1.concat(' ', somme,' bon numéros');
			document.querySelector("#res").innerHTML = somme
		}
		return resultat
	}
}