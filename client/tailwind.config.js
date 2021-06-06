module.exports = {
    purge: {content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  options:{
    safelist:[/^bg-[a-zA-Z]+-500$/,/^border-[a-zA-Z]+-500$/]
  }
  },
    darkMode: false, 
    theme: {
    
          fontFamily:{
              sans:[
                  'Inter','sans-serif'
              ]
          },
          extend:{
            minWidth:{
              '20': '5rem',
            },
            
       
          }
      
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }


  /* CSS HEX 
--medium-slate-blue: #826aedff;
--heliotrope: #c879ffff;
--mauve: #ffb7ffff;
--aqua: #3bf4fbff;
--mindaro: #caff8aff;

 CSS HSL 
--medium-slate-blue: hsla(251, 78%, 67%, 1);
--heliotrope: hsla(275, 100%, 74%, 1);
--mauve: hsla(300, 100%, 86%, 1);
--aqua: hsla(182, 96%, 61%, 1);
--mindaro: hsla(87, 100%, 77%, 1);

SCSS HEX
$medium-slate-blue: #826aedff;
$heliotrope: #c879ffff;
$mauve: #ffb7ffff;
$aqua: #3bf4fbff;
$mindaro: #caff8aff;

SCSS HSL 
$medium-slate-blue: hsla(251, 78%, 67%, 1);
$heliotrope: hsla(275, 100%, 74%, 1);
$mauve: hsla(300, 100%, 86%, 1);
$aqua: hsla(182, 96%, 61%, 1);
$mindaro: hsla(87, 100%, 77%, 1);

 SCSS RGB 
$medium-slate-blue: rgba(130, 106, 237, 1);
$heliotrope: rgba(200, 121, 255, 1);
$mauve: rgba(255, 183, 255, 1);
$aqua: rgba(59, 244, 251, 1);
$mindaro: rgba(202, 255, 138, 1);

 SCSS Gradient 
$gradient-top: linear-gradient(0deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-right: linear-gradient(90deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-bottom: linear-gradient(180deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-left: linear-gradient(270deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-top-right: linear-gradient(45deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-bottom-right: linear-gradient(135deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-top-left: linear-gradient(225deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-bottom-left: linear-gradient(315deg, #826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff);
$gradient-radial: radial-gradient(#826aedff, #c879ffff, #ffb7ffff, #3bf4fbff, #caff8aff); */