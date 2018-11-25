import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.colorNavBar();
  }

  colorNavBar() {
    const navBar = document.getElementsByClassName('nav-container')[0];
    document.addEventListener('scroll', () => {
      if (scrollY > 0) {
        navBar.classList.add('nav-container-dark');
        navBar.classList.remove('nav-container-light');
      } else if (scrollY === 0) {
        navBar.classList.remove('nav-container-dark');
        navBar.classList.add('nav-container-light');
      }
    });
  }

}
