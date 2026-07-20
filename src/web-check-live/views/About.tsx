import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import colors from 'web-check-live/styles/colors';
import Heading from 'web-check-live/components/Form/Heading';
import Footer from 'web-check-live/components/misc/Footer';
import Nav from 'web-check-live/components/Form/Nav';
import Button from 'web-check-live/components/Form/Button';
import AdditionalResources from 'web-check-live/components/misc/AdditionalResources';
import { StyledCard } from 'web-check-live/components/Form/Card';
import docs, { about, featureIntro, license, fairUse, supportUs } from 'web-check-live/utils/docs';

const AboutContainer = styled.div`
width: 95vw;
max-width: 1000px;
margin: 2rem auto;
padding-bottom: 1rem;
header {
  margin 1rem 0;
  width: auto;
}
section {
  width: auto;
  .inner-heading { display: none; }
}
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const Section = styled(StyledCard)`
  margin-bottom: 2rem;
  overflow: clip;
  max-height: 100%;
  section {
    clear: both;
  }
  h3 {
    font-size: 1.5rem;
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    padding: 0 0 0 1rem;
    list-style: circle;
  }
  a {
    color: ${colors.primary};
    &:visited { opacity: 0.8; }
  }
  pre {
    background: ${colors.background};
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
  }
  small { opacity: 0.7; }
  .contents {
    ul {
      list-style: none;
      li {
        a {
          // color: ${colors.textColor};
          &:visited { opacity: 0.8; }
        }
        b {
          opacity: 0.75;
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .example-screenshot {
    float: right; 
    display: inline-flex;
    flex-direction: column;
    clear: both;
    max-width: 300px;
    img {
      float: right;
      break-inside: avoid;
      max-width: 300px;
      // max-height: 30rem;
      border-radius: 6px;
      clear: both;
    }
    figcaption {
      font-size: 0.8rem;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

const SponsorshipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.5rem;
  img {
    border-radius: 4px;
  }
`;

const makeAnchor = (title: string): string => {
  return title.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-");
};

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash fragment if present
    if (location.hash) {
      // Add a small delay to ensure the page has fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
    <AboutContainer>
      <Nav>
        <HeaderLinkContainer>
          <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check"><Button>Voir sur GitHub</Button></a>
        </HeaderLinkContainer>
      </Nav>

      <Heading as="h2" size="medium" color={colors.primary}>Introduction</Heading>
      <Section>
        {about.map((para, index: number) => (
          <p key={index}>{para}</p>
        ))}
        <hr />
        <SponsorshipContainer>
          <p>
            Web-Check est généreusement sponsorisé
            par <a target="_blank" rel="noreferrer" href="https://terminaltrove.com/?utm_campaign=github&utm_medium=referral&utm_content=web-check&utm_source=wcgh">
              Terminal Trove
            </a>
            <br />
            Le $HOME de tout ce qui touche au terminal.
            <br />
            <small>
              <a target="_blank" rel="noreferrer" href="https://terminaltrove.com/newsletter?utm_campaign=github&utm_medium=referral&utm_content=web-check&utm_source=wcgh">
                Découvrez votre prochain outil CLI / TUI et recevez des mises à jour directement dans votre boîte de réception
              </a>
            </small>
          </p>
          <a target="_blank" rel="noreferrer" href="https://terminaltrove.com/?utm_campaign=github&utm_medium=referral&utm_content=web-check&utm_source=wcgh">
            <img width="300" alt="Terminal Trove" src="https://i.ibb.co/T1KzVmR/terminal-trove-green.png" />
          </a>
        </SponsorshipContainer>
        <hr />
        <p>
          Web-Check est développé et maintenu par <a target="_blank" rel="noreferrer" href="https://aliciasykes.com">Alicia Sykes</a>.
          Il est sous licence <a target="_blank" rel="noreferrer" href="https://github.com/Lissy93/web-check/blob/master/LICENSE">MIT</a>,
          et est totalement gratuit à utiliser, modifier et distribuer dans des cadres personnels et commerciaux.<br />
          Le code source et la documentation d'auto-hébergement sont disponibles sur <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check">GitHub</a>.
          Si vous trouvez ce service utile, vous pouvez <a target="_blank" rel="noreferrer" href="https://github.com/sponsors/Lissy93">me soutenir</a> à partir de 1$/mois,
          pour aider aux coûts d'hébergement et de développement continu.
        </p>
      </Section>
      
      <Heading as="h2" size="medium" color={colors.primary}>Fonctionnalités</Heading>
      <Section>
        {featureIntro.map((fi: string, i: number) => (<p key={i}>{fi}</p>))}
        <div className="contents">
        <Heading as="h3" size="small" id="#feature-contents" color={colors.primary}>Sommaire</Heading>
          <ul>
            {docs.map((section, index: number) => (
              <li key={index}>
                <b>{index + 1}</b>
                <a href={`#${makeAnchor(section.title)}`}>{section.title}</a></li>
            ))}
          </ul>
          <hr />
        </div>
        {docs.map((section, sectionIndex: number) => (
          <section key={section.title}>
            { sectionIndex > 0 && <hr /> }
            <Heading as="h3" size="small" id={makeAnchor(section.title)} color={colors.primary}>{section.title}</Heading>
            {section.screenshot &&
              <figure className="example-screenshot">
                <img className="screenshot" src={section.screenshot} alt={`Exemple de capture d'écran ${section.title}`} />
                <figcaption>Fig.{sectionIndex + 1} - Exemple de {section.title}</figcaption>
              </figure> 
            }
            {section.description && <>
              <Heading as="h4" size="small">Description</Heading>
              <p>{section.description}</p>
            </>}
            { section.use && <>
              <Heading as="h4" size="small">Cas d'utilisation</Heading>
              <p>{section.use}</p>
            </>}
            {section.resources && section.resources.length > 0 && <>
              <Heading as="h4" size="small">Liens utiles</Heading>
              <ul>
                {section.resources.map((link: string | { title: string, link: string }, linkIndx: number) => (
                  typeof link === 'string' ? (
                    <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}><a target="_blank" rel="noreferrer" href={link}>{link}</a></li>
                  ) : (
                    <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}><a target="_blank" rel="noreferrer" href={link.link}>{link.title}</a></li>
                  )
                ))}
              </ul>
            </>}
          </section>
        ))}
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>Déployer votre propre instance</Heading>
      <Section>
        <p>Web-Check est conçu pour être facilement auto-hébergé.</p>
        <Heading as="h3" size="small" color={colors.primary}>Option n°1 - Netlify</Heading>
        <p>Cliquez sur le bouton ci-dessous pour déployer sur Netlify</p>
        <a target="_blank" rel="noreferrer" href="https://app.netlify.com/start/deploy?repository=https://github.com/lissy93/web-check">
          <img src="https://www.netlify.com/img/deploy/button.svg" alt="Déployer sur Netlify" />
        </a>

        <Heading as="h3" size="small" color={colors.primary}>Option n°2 - Vercel</Heading>
        <p>Cliquez sur le bouton ci-dessous pour déployer sur Vercel</p>
        <a target="_blank" rel="noreferrer" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flissy93%2Fweb-check&project-name=web-check&repository-name=web-check-fork&demo-title=Web-Check%20Demo&demo-description=Check%20out%20web-check.xyz%20to%20see%20a%20live%20demo%20of%20this%20application%20running.&demo-url=https%3A%2F%2Fweb-check.xyz&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2FLissy93%2Fweb-check%2Fmaster%2F.github%2Fscreenshots%2Fweb-check-screenshot10.png">
          <img src="https://vercel.com/button" alt="Déployer sur Vercel" />
        </a>

        <Heading as="h3" size="small" color={colors.primary}>Option n°3 - Docker</Heading>
        <p>
        Un conteneur Docker est publié sur <a target="_blank" rel="noreferrer" href="https://hub.docker.com/r/lissy93/web-check">DockerHub</a>
        <br />
        Exécutez cette commande, puis ouvrez <code>localhost:3000</code>
        <pre>docker run -p 3000:3000 lissy93/web-check</pre>
        </p>

        <Heading as="h3" size="small" color={colors.primary}>Option n°4 - Manuel</Heading>
        <pre>
        git clone https://github.com/Lissy93/web-check.git<br />
        cd web-check # Accéder au dossier du projet<br />
        yarn install # Installer les dépendances<br />
        yarn build # Compiler l'application pour la production<br />
        yarn serve # Démarrer l'application (API et GUI)<br />
        </pre>

        <Heading as="h3" size="small" color={colors.primary}>Documentation complémentaire</Heading>
        <p>
          Des instructions d'installation et de configuration plus détaillées sont disponibles dans le dépôt GitHub - <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check#readme">github.com/lissy93/web-check</a>
        </p>

        <Heading as="h3" size="small" color={colors.primary}>Configuration</Heading>
        <p>
          Certaines variables d'environnement optionnelles peuvent être spécifiées pour débloquer des vérifications Web supplémentaires.
          Consultez le fichier README pour la liste complète.
        </p>

        <ul>
          <li>
            <code>GOOGLE_CLOUD_API_KEY</code>
            : <a target="_blank" rel="noreferrer" href="https://cloud.google.com/api-gateway/docs/authenticate-api-keys">Une clé d'API Google</a>
            <i> Utilisée pour obtenir les métriques de qualité d'un site</i>
          </li>
          <li>
            <code>REACT_APP_SHODAN_API_KEY</code>
            : <a target="_blank" rel="noreferrer" href="https://account.shodan.io/">Une clé d'API Shodan</a>
            <i> Pour afficher les hôtes associés à un domaine</i>
          </li>
          <li>
            <code>REACT_APP_WHO_API_KEY</code>
            : <a target="_blank" rel="noreferrer" href="https://whoapi.com/">Une clé WhoAPI</a>
            <i> Permet d'obtenir des enregistrements WhoIs plus complets</i>
          </li>
        </ul>

      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>Documentation de l'API</Heading>
      <Section>
        {/* eslint-disable-next-line*/}
        <p>// Bientôt disponible...</p>
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>Ressources Supplémentaires</Heading>
      <AdditionalResources />

      <Heading as="h2" size="medium" color={colors.primary}>Nous Soutenir</Heading>
      <Section>
        {supportUs.map((para, index: number) => (<p dangerouslySetInnerHTML={{__html: para}} />))}
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>Conditions & Infos</Heading>
      <Section>
      <Heading as="h3" size="small" color={colors.primary}>Licence</Heading>
        <b>
          <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check">Web-Check</a> est distribué sous licence MIT,
          © <a target="_blank" rel="noreferrer" href="https://aliciasykes.com">Alicia Sykes</a> { new Date().getFullYear()}
        </b>
        <br />
        <small>Pour plus d'informations, voir <a target="_blank" rel="noreferrer" href="https://tldrlegal.com/license/mit-license">TLDR Legal → MIT</a></small>
        <pre>{license}</pre>
        <hr />
        <Heading as="h3" size="small" color={colors.primary}>Usage Équitable (Fair Use)</Heading>
        <ul>
          {fairUse.map((para, index: number) => (<li>{para}</li>))}
        </ul>
        <hr />
        <Heading as="h3" size="small" color={colors.primary}>Confidentialité</Heading>
        <p>
        Des statistiques anonymes sont utilisées sur l'instance de démo (via une instance Plausible auto-hébergée). Cela enregistre uniquement l'URL visitée, sans aucune donnée personnelle.
        Un journal d'erreurs de base est également présent (via une instance GlitchTip auto-hébergée) dans le seul but de corriger les bugs.
        <br />
        <br />
        Ni votre adresse IP, ni les informations de votre navigateur/système/matériel, ni aucune autre donnée ne seront jamais collectées ou conservées.
        (Vous pouvez le vérifier vous-même en inspectant le code source ou avec vos outils de développement)
        </p>
      </Section>
    </AboutContainer>
    <Footer />
    </div>
  );
}

export default About;
