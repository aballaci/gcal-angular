import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence, animateChild, group, state
} from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    transition('* => goAnimate', [
      query(
        ':self',
        stagger(30, [
          style({ opacity: 0 }),
          animate(
            '.6s ease-out',
            style({ opacity: 1})
          )
        ]),
        { optional: false }
      )
    ])
  ]);

export const scrollAnimation = trigger('scrollAnimation', [
  state('show', style({
    opacity: 1,
  })),
  state('hide', style({
    opacity: 0,
  })),
  transition('show<=>hide', animate('200ms linear')),
]);
//
// export const enterAnimation = trigger('showItem', [
//   transition('* <=> EventsPage',
//   query(
//     ':enter.item > *',
//     [
//       style({
//         transform: 'translateY(-3%)',
//         opacity: 0,
//         position: 'static'
//       }),
//       animate(
//         '0.5s ease-in-out',
//         style({ transform: 'translateY(0%)', opacity: 1 })
//       )
//     ],
//     { optional: true }
//   ))
// ]);
