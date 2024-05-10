import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class MovieFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  movieForm!: FormGroup;
  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      rating: [null, [Validators.required]],
      genre: new FormArray([new FormControl(null, Validators.required)]),
    });
    console.log(this.movieForm);
  }
  ////////form array
  get formArray(): FormArray {
    return this.movieForm.get('genre') as FormArray;
  }

  addFormControl() {
    const newControl = this.formBuilder.control(null, Validators.required);
    this.formArray.push(newControl);
  }

  removeFormControl(index: number) {
    this.formArray.removeAt(index);
  }
  get getFormArrayControls(): FormControl[] {
    return this.formArray.controls as FormControl[];
  }
  ////////form array
}
