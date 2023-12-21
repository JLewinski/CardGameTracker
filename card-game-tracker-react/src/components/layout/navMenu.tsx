import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavMenu() {

    const [IsThemeOn, setTheme] = useState(localStorage.getItem('theme') === 'light');
  
  
    if (IsThemeOn) {
      document.querySelector('html')?.setAttribute('data-bs-theme', 'light');
    } else {
      document.querySelector('html')?.setAttribute('data-bs-theme', 'dark');
    }
  
    function changeTheme(e: React.ChangeEvent<HTMLInputElement>) {
  
      let theme = e.target.checked ? 'light' : 'dark';
  
      document.querySelector('html')?.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
      setTheme(theme === 'light');
    }
  
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Tracker</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
            aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/wizard/start">
                  <span className="bi-seahorse-nav-menu" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path stroke="currentColor" fill="currentColor" d="M105.983.776c-.514.242-1.012.717-1.536 1.464-.426.608-.956 1.222-1.176 1.365-1.211.783-7.983 1.256-10.585.739-2.792-.554-2.622-.559-2.956.087-.225.433-.322 1.293-.384 3.398-.153 5.144-.153 5.143-1.46 7.506-2.28 4.122-4.793 5.785-8.903 5.887l-2.592.065-.022 2.474c-.042 4.702-.677 5.547-4.33 5.756-2.684.154-2.592.142-2.592.339 0 .091-.071.121-.158.068-.407-.252-.636.835-.535 2.539.158 2.651-.722 4.251-3.287 5.976a627.107 627.107 0 0 0-3.112 2.111c-1.766 1.206-3.594 2.226-3.991 2.227-.137 0-.47.155-.741.345-.27.19-1.098.658-1.84 1.04-1.875.965-1.984 1.206-1.984 4.37 0 2.661.389 3.865 1.351 4.183.173.058.843.351 1.488.652 3.424 1.599 11.852 1.258 15.45-.624a26.328 26.328 0 0 1 1.732-.805c.52-.217 1.145-.582 1.389-.811.243-.23.692-.547.998-.707a9.938 9.938 0 0 0 1.111-.705c.305-.228.888-.58 1.296-.781a135.145 135.145 0 0 0 1.296-.652c1.405-.72 5.673-.532 7.718.34.643.275 1.379.51 1.633.524.255.014.921.288 1.481.61 2.939 1.685 7.367 1.548 11.559-.357l1.651-.75 2.385.04c2.893.048 4.611.507 5.776 1.546.316.281.769.682 1.009.892 1.15 1.007.164 4.632-1.788 6.567l-1.24 1.23-1.574-.1c-.88-.056-2.063-.272-2.685-.491a100.918 100.918 0 0 0-2.188-.738c-.592-.191-1.277-.477-1.521-.637-1.282-.84-2.006-.23-2.058 1.738-.053 1.986-.85 3.861-2.47 5.814-1.825 2.198-2.315 2.396-5.88 2.369-3.905-.03-3.741-.232-3.355 4.14.24 2.716.129 3.143-1.276 4.873-1.169 1.44-1.82 1.74-4.176 1.917-2.906.218-3.366.816-2.95 3.837.418 3.042-.095 5.168-1.532 6.351-1.252 1.031-4.484 1.994-6.713 2-.594.002-.973.084-.973.211 0 .136-.112.12-.324-.046-.291-.228-.299-.223-.08.058.191.243.197.402.029.715-.207.389-.171 1.17.108 2.28.229.909-.45 3.432-1.017 3.781a7.77 7.77 0 0 0-.938.713c-.658.596-1.73 1.034-3.332 1.36-1.783.363-1.883.54-1.655 2.951.245 2.595-.212 3.854-2.091 5.758-1.198 1.212-2.985 2.203-4.245 2.353-1.252.148-2.102 1.485-1.27 1.999.351.217.221 4.021-.183 5.308-.203.646-.369 1.403-.37 1.683-.002.28-.079.509-.172.509-.093 0-.312.372-.485.827-.356.931-2.336 2.923-3.704 3.724-.455.267-.827.565-.827.663 0 .098-.065.138-.144.089-.373-.23.082 2.107.495 2.547.395.42.423.574.328 1.814-.26 3.368-.759 4.681-2.392 6.284-.617.606-.666.726-.516 1.25.251.873.973 2.261 1.442 2.773.543.592.613 3.963.111 5.378-.466 1.311.038 2.35 1.484 3.057.784.384 1.072.633 1.157 1.006.063.273.329.954.592 1.514 1.049 2.236.667 4.738-.89 5.832-1.186.833-1.205 1.345-.09 2.461.475.474.981 1.091 1.125 1.368.143.278.553.729.911 1.002 1.855 1.415 2.62 6.63 1.303 8.879-.295.503-.593 1.227-.663 1.609-.141.77-.239.698 1.488 1.082 2.77.615 5 3.112 5 5.599 0 .245.166.927.368 1.517.251.729.333 1.3.255 1.786-.079.494-.025.849.174 1.153.63.962.823 1.048 2.351 1.048 2.318 0 4.398.753 4.553 1.649.064.366.281 1.291.482 2.055l.515 1.944c.247.932.402 1.206.809 1.423.402.215 3.639.628 6.418.819 2.317.159 5.74 1.48 5.74 2.215 0 .128.362.677.805 1.222.98 1.204 1.417 2.021 1.417 2.647 0 1.306 1.151 1.504 3.022.52 2.324-1.221 5.726-.938 8.47.706 1.952 1.169 2.676 1.079 4.263-.522 3.252-3.283 5.893-4.14 8.965-2.91 2.138.855 3.518.492 4.21-1.105.13-.299.422-.882.651-1.296.229-.414.504-.971.612-1.238.14-.345.61-.689 1.621-1.185.783-.385 1.647-.854 1.919-1.044.554-.387 1.76-.658 3.943-.888 2.15-.227 2.877-1.517 2.877-5.108v-1.351l.917-.673c.504-.37 1.14-.94 1.411-1.266.272-.326 1.044-.925 1.715-1.333 1.597-.969 1.835-1.647 1.567-4.475-.182-1.925.04-4.181.516-5.247.95-2.126 1.385-4.341.988-5.031-.326-.565-3.507-3.406-4.079-3.643-.983-.406-1.355-4.372-.555-5.918.934-1.807-.201-3.699-2.253-3.755-2.086-.057-4.857-2.377-4.857-4.066 0-.368-.159-.996-.353-1.395-.235-.484-.288-.767-.157-.849.204-.127-.935-.256-3.938-.445-2.449-.154-3.648-.782-4.761-2.49-1.263-1.939-1.339-2.029-1.82-2.149-.708-.178-1.343.185-2.951 1.689-2.372 2.217-4.075 2.627-6.987 1.683-1.51-.489-1.786-.514-1.8-.159-.164 4.296-.974 5.585-3.704 5.894-1.981.224-2.527 1.136-1.658 2.771 1.381 2.599 1.115 5.016-.779 7.072-1.147 1.244-.766 2.24 1.331 3.48.761.45 1.749 1.897 2.104 3.083.142.475.346 1.028.454 1.228.107.2.241 1.185.299 2.191.161 2.806.423 3.281 2.575 4.667 2.125 1.369 4.874.463 5.965-1.964.622-1.383.532-2.256-.542-5.319-.707-2.013.14-5.566 1.526-6.41.734-.446 3.733-.499 4.68-.083a6.26 6.26 0 0 0 1.276.374c1.796.286 3.056 1.741 3.353 3.87.295 2.123.324 2.007-.634 2.529-.48.262-1.063.65-1.296.863-.233.213-.598.44-.811.504-1.171.354-1.41 1.401-.827 3.626.505 1.931.733 4.376.475 5.125-1.032 3-4.628 3.683-8.568 1.627-.874-.456-1.69-.344-2.243.307-2.318 2.731-3.054 3.129-5.786 3.129-1.617 0-2.333-.483-2.803-1.895-.14-.42-.416-.853-.614-.962-.198-.11-.669-.468-1.049-.795-.38-.329-.879-.637-1.111-.685-1.121-.234-2.929-.477-3.538-.477h-.679V175c0-2.556-.895-3.788-3.762-5.179-1.177-.571-1.272-.894-1.147-3.867.074-1.754.17-2.282.567-3.148.263-.573.546-1.374.628-1.782.083-.407.204-.871.272-1.029.081-.194-.247-.713-.995-1.574-1.064-1.226-1.256-1.54-2.065-3.374-.623-1.413-.183-5.519.642-5.997.117-.068.795-.557 1.508-1.089s1.724-1.158 2.245-1.393c1.608-.722 2.143-1.906 1.46-3.228-.373-.722-.429-4.681-.077-5.438.272-.583 2.152-1.897 2.921-2.042.269-.051 1.113-.144 1.877-.208 1.864-.157 2.408-.615 2.408-2.031 0-1.043.52-2.836 1.264-4.356.766-1.565.339-1.35 4.057-2.041 2.817-.524 3.333-.88 3.473-2.402.642-6.986.857-7.361 4.529-7.907.965-.143 1.861-.35 1.993-.46.172-.142.239-.14.239.009 0 .114.083.207.185.207s.185-.172.185-.383c0-.21.1-.565.223-.787.143-.261.233-1.46.251-3.368.021-2.196.321-7.867.443-8.375.071-.295.95-.56 1.486-.449l.642.134.024 3.142c.025 3.341.102 3.793 1.163 6.795.992 2.808 3.893 6.827 5.319 7.37.662.252 2.525.212 4.061-.086 1.913-.372 4.774-1.205 5.092-1.484.153-.134.486-.305.741-.382 2.087-.626 6.343-4.29 7.332-6.312 1.345-2.749.982-3.209-3.72-4.708-2.025-.645-3.005-1.031-3.542-1.395-.292-.198-.968-.61-1.501-.915-.933-.535-3.434-2.818-3.74-3.414-.214-.418-.559-2.5-.647-3.901a73.559 73.559 0 0 0-.09-1.329c-.067-.533-.672-.708-2.482-.716-3.651-.015-4.707-.611-4.492-2.531.12-1.077.412-1.841.752-1.972.894-.343 7.063 1.514 8.09 2.436.339.304 1.153.958 1.808 1.453 1.216.918 1.967 1.806 2.993 3.543.658 1.113 1.053 1.389 1.783 1.248.358-.07.41-.054.172.051-.306.135-.312.175-.054.39.246.204.305.169.409-.245.067-.267.275-.566.461-.666.187-.1.522-.681.745-1.292l.405-1.109 1.966-.022c1.081-.012 2.208-.074 2.506-.139.605-.131.547.093.823-3.225.247-2.987 1.175-4.128 3.516-4.324.576-.049 1.391-.174 1.813-.281.55-.139.875-.134 1.157.017.476.255.509.026.068-.463-.523-.58-.584-6.62-.076-7.616.5-.979 2.091-2.273 3.193-2.596 1.358-.398 1.998-1.937 1.181-2.84-1.741-1.925-1.458-9.252.413-10.68 1.146-.875 2.013-3.336 1.496-4.246-.05-.087-.145-.389-.212-.67s-.647-1.573-1.288-2.87c-1.908-3.861-1.915-4.803-.052-6.844.775-.849.906-1.104.926-1.798.013-.445.096-.764.186-.71.089.054.124-.017.077-.158-.047-.141-.165-.258-.261-.258s-.547-.299-1.003-.666a13.479 13.479 0 0 0-1.609-1.095c-.729-.401-2.269-2.548-2.139-2.982.024-.08-.113-.669-.304-1.311-.76-2.553-.399-5.561.893-7.44.309-.45.583-1.077.607-1.393.025-.316.127-.575.227-.575.198 0-.197-.456-.41-.473-.951-.081-2.054-.431-3.221-1.024-.783-.398-1.573-.724-1.753-.724-.613 0-2.095-1.655-1.913-2.136.087-.23.119-.459.07-.507-.049-.049-.008-.454.09-.899.507-2.283.617-3.938.316-4.767-.254-.701-.256-.778-.015-.579.227.189.278.175.278-.07 0-.419-.739-.396-.747.024-.006.307-.018.308-.251.001-.18-.237-.703-.371-1.985-.508-5.705-.609-7.584-2.596-6.865-7.26.495-3.213.489-3.46-.093-3.684-.442-.171-4.819-.509-6.883-.533-1.069-.012-1.613-.804-1.879-2.737-.123-.891-.348-1.819-.501-2.061-.153-.242-.186-.383-.074-.314s.204.049.204-.045c0-.294-1.353-.111-2.135.289-1.181.604-2.823.842-5.189.751l-2.145-.083-.734-.821a9.547 9.547 0 0 1-1.206-1.777C108.139.621 107.268.18 105.985.784M87.573 27.496c4.341.93 3.247 8.376-1.179 8.021-1.845-.148-3.985-1.714-3.985-2.917 0-.293-.07-.577-.155-.629-.832-.514 1.038-4.2 2.264-4.458l.762-.161c.661-.14 1.091-.113 2.293.145m62.737 35.227c-.068.068-.123.29-.123.494 0 .465.245.246.281-.251.03-.406.02-.421-.158-.243m.988.247c0 .209.123.37.284.37.227 0 .244-.075.086-.37-.109-.203-.237-.37-.284-.37-.048 0-.086.167-.086.37" /></svg>
                  </span> Wizard
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" component="hearts/start">
                  <span className="bi bi-suit-heart-fill" aria-hidden="true"></span> Hearts
                </NavLink>
              </li> */}
            </ul>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="themeSwitcher" onChange={changeTheme} checked={IsThemeOn} />
              <label className="form-check-label" htmlFor="themeSwitcher">{IsThemeOn ? 'Light Theme' : 'Dark Theme'}</label>
            </div>
          </div>
  
        </div>
      </nav>
    )
  }