import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {LoaderService} from '../shared/services/loader.service';
import {ICity} from '../shared/model/iCity';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  tempImageUrl = '../../assets/img/loading.png'; // 'https://scontent-arn2-1.cdninstagram.com/t51.2885-15/e35/17881799_1032823740153171_2960332781730660352_n.jpg';
  imageUrl = this.tempImageUrl;
  cityToAdd = '';
  button = ['', '', '', ''];
  buttonAbility = true;
  cityToGuess: ICity;
  imgLoaded = false;

  constructor(private loaderService: LoaderService, private authService: AuthService) { }

  ngOnInit() {
    this.disableButtons();
    this.loaderService.cityInit().subscribe(inp => this.loadNewQuestion(), error => console.log(error));
  }

  loadNewQuestion() {
    this.imgLoaded = false;
    this.cityToGuess = this.getNewCity();
    console.log(this.cityToGuess);
    this.randomizeAnswers(this.cityToGuess.name);
    this.loadImage();
  }

  loadImage() {
    this.loaderService.getImageUrl(this.cityToGuess.woeId)
      .subscribe(data => {
        this.imageUrl = data;
        // console.log(data);
      },
      error => this.loadImage());
  }

  buttonClicked(btnId: number) {
    this.disableButtons();
    this.checkAnswer(this.button[btnId]);
    this.loadNewQuestion();
  }
  disableButtons() {
    this.buttonAbility = false;
  }
  enableButtons() {
    this.buttonAbility = true;
  }
  checkAnswer(city: string) {
    console.log(city === this.cityToGuess.name ? 'correct' : 'incorrect. it is '+this.cityToGuess.name);
    if (city === this.cityToGuess.name)
      this.correctAnswerBehaviour();
    else 
      this.incorrectAnswerBehaviour();
  }
  correctAnswerBehaviour() {
    this.authService.increaseScore();
  }
  incorrectAnswerBehaviour() {

  }
  getNewCity(): ICity {
    return this.loaderService.pickRandomCity();
  }
  randomizeAnswers(city: string) {
    let n = Math.floor(Math.random() * 4);
    this.button[n] = city;

    for (let i=0; i<4; i++) 
      if(i !== n) {
        let notUnique;
        do {
          this.button[i] = this.getNewCity().name;
          
          notUnique = false;
          for (let j=0; j<i; j++)
            if (this.button[i] === this.button[j])
              notUnique = true;
        } while (notUnique)
      }

    // console.log(n, city, this.button);
  }
  imageLoaded() {
    this.imgLoaded = true;
    this.enableButtons()
    // console.log("==Image Loaded!");
  }
}
