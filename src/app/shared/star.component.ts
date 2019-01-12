import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rating-star',
    templateUrl: './star.component.html',
    styles: [`
            .rating{
                overflow: hidden;
            }
            .fa-star{
                width: 12px;
                color: #17A2B8;
            }
            `]
})

export class RatingStar implements OnChanges {
    starWidth: number = 86;
    starHeight: number = 23;
    starNumber: number = 5;
    starTitle: string;

    @Input() rating: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    
    ngOnChanges() {
        this.starTitle = 'Rating is ' + this.rating ; 
        this.starWidth = this.rating * this.starWidth/this.starNumber;
    }

    OnClick() {
        this.ratingClicked.emit(`This Rating ${this.rating} is Clicked`);
    }
}