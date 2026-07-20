import styled from '@emotion/styled';
import { type ChangeEvent, type FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, type NavigateOptions } from 'react-router-dom';

import Heading from 'web-check-live/components/Form/Heading';
import Input from 'web-check-live/components/Form/Input'
import Button from 'web-check-live/components/Form/Button';
import { StyledCard } from 'web-check-live/components/Form/Card';
import Footer from 'web-check-live/components/misc/Footer';
import FancyBackground from 'web-check-live/components/misc/FancyBackground';

import docs from 'web-check-live/utils/docs';
import colors from 'web-check-live/styles/colors';
import { determineAddressType } from 'web-check-live/utils/address-type-checker';

const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'PTMono';
  padding: 1.5rem 1rem 4rem 1rem;
  footer {
    z-index: 1;
  }
`;

const UserInputMain = styled.form`
  background: rgba(17, 24, 39, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  z-index: 2;
`;

const SponsorCard = styled.div`
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.25rem;
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  z-index: 2;
  .inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    p {
      margin: 0.25rem 0;
      color: ${colors.textColorSecondary};
    }
  }
  a {
    color: ${colors.textColor};
  }
  img {
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease-in-out;
    margin: 0 auto;
    display: block;
    width: 200px;
    &:hover {
      transform: scale(1.02);
    }
  }
  .cta {
    font-size: 0.85rem;
    a { color: ${colors.primaryLighter}; }
  }
`;

// const FindIpButton = styled.a`
//   margin: 0.5rem;
//   cursor: pointer;
//   display: block;
//   text-align: center;
//   color: ${colors.primary};
//   text-decoration: underline;
// `;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  margin: 0.5rem;
`;

const SiteFeaturesWrapper = styled(StyledCard)`
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  z-index: 2;
  .links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    a {
      width: 100%;
      button {
        width: calc(100% - 2rem);
      }
    }
    @media(max-width: 600px) {
      flex-wrap: wrap;
    }
  }
  ul {
    -webkit-column-width: 150px;
    -moz-column-width: 150px;
    column-width: 150px;
    list-style: none;
    padding: 0 1rem;
    font-size: 0.9rem;
    color: ${colors.textColor};
    li {
      margin: 0.1rem 0;
      text-indent: -1.2rem;
      break-inside: avoid-column;
    }
    li:before {
      content: '✓';
      color: ${colors.primary};
      margin-right: 0.5rem;
    }
  }
  a {
    color: ${colors.primary};
  }
`;

const Home = (): JSX.Element => {
  const defaultPlaceholder = 'ex. https://duck.com/';
  const [userInput, setUserInput] = useState('');
  const [errorMsg, setErrMsg] = useState('');
  const [placeholder] = useState(defaultPlaceholder);
  const [inputDisabled] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  /* Redirect strait to results, if somehow we land on /check?url=[] */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const urlFromQuery = query.get('url');
    if (urlFromQuery) {
      navigate(`/check/${encodeURIComponent(urlFromQuery)}`, { replace: true });
    }
  }, [navigate, location.search]);

  /* Check is valid address, either show err or redirect to results page */
  const submit = () => {
    let address = userInput.endsWith("/") ? userInput.slice(0, -1) : userInput;
    const addressType = determineAddressType(address);
  
    if (addressType === 'empt') {
      setErrMsg('Le champ ne doit pas être vide');
    } else if (addressType === 'err') {
      setErrMsg('Doit être une URL valide ou une adresse IPv4/IPv6');
    } else {
      // if the addressType is 'url' and address doesn't start with 'http://' or 'https://', prepend 'https://'
      if (addressType === 'url' && !/^https?:\/\//i.test(address)) {
        address = 'https://' + address;
      }
      const resultRouteParams: NavigateOptions = { state: { address, addressType } };
      navigate(`/check/${encodeURIComponent(address)}`, resultRouteParams);
    }
  };
  

  /* Update user input state, and hide error message if field is valid */
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    const isError = ['err', 'empt'].includes(determineAddressType(event.target.value));
    if (!isError) setErrMsg('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  const formSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  }

  return (
    <HomeContainer>
      <FancyBackground />
      <UserInputMain onSubmit={formSubmitEvent}>
        <a href="/">
          <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
            <img width="64" src="/web-check.png" alt="Icone Web Check" />
            Web Check
          </Heading>
        </a>
        <Input
          id="user-input"
          value={userInput}
          label="Entrez une URL"
          size="large"
          orientation="vertical"
          name="url"
          placeholder={placeholder}
          disabled={inputDisabled}
          handleChange={inputChange}
          handleKeyDown={handleKeyPress}
        />
        { errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Button type="submit" styles="width: calc(100% - 1rem);" size="large" onClick={submit}>Analyser !</Button>
      </UserInputMain>
      <SiteFeaturesWrapper>
        <div className="features">
          <Heading as="h2" size="small" color={colors.primary}>Vérifications supportées</Heading>
          <ul>
            {docs.map((doc, index) => (<li key={index}>{doc.title}</li>))}
            <li><Link to="/check/about">+ encore plus !</Link></li>
          </ul>
        </div>
        <div className="links">
          <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check" title="Découvrez le code source et la documentation sur GitHub, et contribuez">
            <Button>Voir sur GitHub</Button>
          </a>
          <a target="_blank" rel="noreferrer" href="https://app.netlify.com/start/deploy?repository=https://github.com/lissy93/web-check" title="Déployez votre propre instance privée ou publique de Web-Check sur Netlify">
            <Button>Déployer la vôtre</Button>
          </a>
          <Link to="/check/about#api-documentation" title="Consultez la documentation de l'API pour utiliser Web-Check de manière programmatique">
            <Button>Docs API</Button>
          </Link>
        </div>
      </SiteFeaturesWrapper>
      <Footer isFixed={true} />
    </HomeContainer>
  );
}

export default Home;
