import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/shared/service/movies.service';
import { Subject, catchError, switchMap, takeUntil } from 'rxjs';
import { IMovie } from 'src/app/movies/shared/interface/movie.interface';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class MovieFormComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router
  ) {}
  onCreateMovie() {
    const id = String(Math.random());
    if (!this.movieForm.valid) return;
    const dto = { ...this.movieForm.value, id };
    console.log(dto);

    this.movieService
      .addMovie(dto)
      .pipe(takeUntil(this.temp$))
      .subscribe({
        next: (val) => this.router.navigateByUrl('/'),
        error: (err) => console.log(err.message),
      });
    console.log(dto);
  }
  onEditMovie() {
    if (!this.movieForm.valid) return;
    const dto = { ...this.movieForm.value, id: this.movieId };
    console.log(dto);

    this.movieService
      .updateMovie(dto, this.movieId)
      .pipe(takeUntil(this.temp$))
      .subscribe({
        next: (val) => this.router.navigateByUrl('/'),
        error: (err) => console.log(err.message),
      });
    console.log(dto);
  }

  temp$ = new Subject<void>();
  currentMovie!: IMovie;
  movieId!: number;
  movieForm!: FormGroup;
  edit: boolean = false;
  create: boolean = false;
  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      rating: [null, [Validators.required]],
      genre: new FormArray([new FormControl(null, Validators.required)]),
    });
    console.log(this.movieForm);
    this.route.params
      .pipe(
        switchMap((val) => {
          console.log(parseFloat(val['id']));
          this.movieId = parseFloat(val['id']);
          return this.movieService.getMovie(parseFloat(val['id'])).pipe(
            catchError((err) => {
              ///////////////////if this is catching why am i still getting error in console before log statement  where to put catch //////////
              console.log(err);
              return err;
            }),
            catchError((err) => {
              ///////////////////if this is catching why am i still getting error in console before log statement  where to put catch//////////
              console.log(err);
              return err;
            })
          );
        }),
        takeUntil(this.temp$)
      )
      .subscribe({
        ////////////// does not work with interface IMovie   could not fix
        // next: (movie:IMovie) => {this.currentMovie = movie
        next: (movie: any) => {
          this.currentMovie = movie;
          const genreArray = this.movieForm.get('genre') as FormArray;
          genreArray.clear();

          // Populate genre FormArray with movie.genre data
          movie.genre.forEach((genre: string[]) => {
            genreArray.push(new FormControl(genre, Validators.required));
          });
          this.movieForm.patchValue({
            title: movie.title,
            rating: movie.rating,
          });
        },
        error: (err) => console.log(err.message),
      });

    ////////////////this does not work how to await subscription ? is this good practice?
    // if (this.currentMovie) {
    //   console.log('!');

    //   this.movieForm.patchValue({
    //     title: this.currentMovie.title,
    //     rating: this.currentMovie.rating,
    //     // Assuming genre is an array of strings
    //     genre: this.currentMovie.genre, // assuming movie.genre is an array of strings
    //   });
    // }
    this.route.queryParams.subscribe({
      next: (query) => {
        console.log(query);
        query['edit'] && (this.edit = true);
        query['create'] && (this.create = true);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
  ngOnDestroy(): void {
    this.temp$.next();
  }
}
