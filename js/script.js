'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
  }

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';


  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */



      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log();

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();




  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        const linkHTMLData = {id: tag, tagName: tag};
        const linkHTML = templates.articleTag(linkHTMLData);

        /* add generated code to html variable */

        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */

        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */

    console.log(allTags)

    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    let html = '';
    for (let tag in allTags) {
      const tagCount = allTags[tag];

      let className = '';
      if (tagCount >= 3) className = 'tag-size-big';
      else if (tagCount === 2) className = 'tag-size-medium';
      else className = 'tag-size-small';

      const linkHTML = '<li><a href="#tag-' + tag + '" class="' + className + '"><span>' + tag + ' (' + tagCount + ')</span></li>';
      html += linkHTML;
    }

    tagList.innerHTML = html;
  }

  generateTags();




  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tagLink of allTagsLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthors() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* get authors from data-author attribute */

      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, authorName: articleAuthor};
      const linkHTML = templates.articleAuthor(linkHTMLData);

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = authorLink;

      /* END LOOP: for every article: */
    }
  }

  generateAuthors();



  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for (let tagLink of allTagsLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

}
