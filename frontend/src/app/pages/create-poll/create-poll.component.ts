import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PollCardOption } from '../../interfaces/ui-config/poll-card-config.interface';
import { CreatePoll } from '../../interfaces/models/create-poll.interface';
import { PollingService } from '../../services/pollingService';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-create-poll',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.scss'
})
export class CreatePollComponent implements OnInit {
  pollForm!: FormGroup;
  faTimesCircle = faTimesCircle;
  faPlus = faPlus
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private pollingService: PollingService,
  private toastrService: ToastrService){}

  ngOnInit(): void {
    this.pollForm = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array<FormGroup<any>>([] as FormGroup[], Validators.required)
    });
    this.addOption();
    this.addOption();
  }

  get options() {
    return this.pollForm?.controls['options'] as FormArray;
  }

  getGroup(index: number): FormGroup<any> {
    return (this.pollForm?.controls['options'] as FormArray).controls[index] as FormGroup<any>;
    // return this.options.controls[index] as FormGroup<any>;
  }

  addOption() {
    console.log(this.pollForm.valid);
    console.log(this.pollForm);
    console.log(this.options);
    this.options.push(this.fb.group({
      option: ['', Validators.required]
    }))
  }

  removeOption(index: number) {
    this.options.controls.splice(index, 1);
  }

  handleCreatePoll() {
    const pollOptions = this.pollForm.value.options.map((item: any) => {
      const options = {
        name: item.option,
        count: 0
      }
      return options as PollCardOption
    }) as PollCardOption[]

    const pollCard: CreatePoll = {
      title: this.pollForm.value.title ?? '',
      options: pollOptions,
      ownerId: this.authService.getCurrentUser().userId ?? '',
      voters: [],
      createdDate: new Date(),
      isActive: true,
      pollId: ''
    }

    this.pollingService.addPolls(pollCard).pipe(
      catchError((error: any) => {
        console.log(error);
        this.toastrService.error("Failed to create a poll, Please try again");
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastrService.success("Successfully create a new poll");
      this.resetForm();
    });
  }

  resetForm() {
    this.pollForm.reset();
    this.options.controls.forEach((item, index) => {
      if(index > 1) {
        this.removeOption(index);
      }
    });
  }


}


