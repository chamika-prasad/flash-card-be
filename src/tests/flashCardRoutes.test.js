const request = require('supertest');
const app = require('../app');
const flashCardService = require('../services/flashCardService');
const settingService = require('../services/settingService');

jest.mock('../services/flashCardService'); // Mock the flashCardService

describe('FlashCard Routes', () => {
  describe('GET /api/flashcards/categories', () => {
    test('should return all flashcard categories', async () => {
      flashCardService.getAllFlashCardCategories.mockResolvedValue([
        { id: "1eea77a5-b48d-11ef-9180-cc28aa8cecd4", name: 'Math',user_id:"0dc779c9-b339-11ef-abcf-cc28aa8cecd4",description:"description" },
      ]);

      const res = await request(app)
        .get('/api/flashcards/categories')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: "1eea77a5-b48d-11ef-9180-cc28aa8cecd4", name: 'Math',user_id:"0dc779c9-b339-11ef-abcf-cc28aa8cecd4",description:"description" },
      ]);
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.getAllFlashCardCategories.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .get('/api/flashcards/categories')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('GET /api/flashcards/categories/:flashCardSetId', () => {
    test('should return a flashcard category by ID', async () => {
      const mockCategory = { id: 1, name: 'Math' };
      flashCardService.getFlashCardCategoryById.mockResolvedValue(mockCategory);

      const res = await request(app)
        .get('/api/flashcards/categories/1')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCategory);
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.getFlashCardCategoryById.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .get('/api/flashcards/categories/1')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('POST /api/flashcards/categories', () => {
    test('should create a new flashcard category', async () => {
      const mockCategory = { id: 3, name: 'History' };
      const mockLimit = { daily_limit: 5 };
      const mockSets = [{ id: 1, name: 'maths' }, { id: 2, name: 'science' }];
      flashCardService.createFlashCardCategory.mockResolvedValue(mockCategory);

      // Mock services
      flashCardService.getFlashCardSetsForTodayForUser = jest.fn().mockResolvedValue(mockSets);
      settingService.getLimit = jest.fn().mockResolvedValue(mockLimit);
      flashCardService.createFlashCardCategory.mockResolvedValue(mockCategory);

      const res = await request(app)
        .post('/api/flashcards/categories')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({ name: 'History', description: 'Historical topics' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ category: mockCategory });
    });

    test('should return 500 if there is a server error', async () => {
      const mockLimit = { daily_limit: 5 };
      const mockSets = [{ id: 1, name: 'maths' }, { id: 2, name: 'science' }];

      // Mock services
      flashCardService.getFlashCardSetsForTodayForUser = jest.fn().mockResolvedValue(mockSets);
      settingService.getLimit = jest.fn().mockResolvedValue(mockLimit);
      flashCardService.createFlashCardCategory.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .post('/api/flashcards/categories')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({ name: 'History', description: 'Historical topics' });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('GET /api/flashcards/:flashCardSetId', () => {
    test('should return all flashcards for a given set', async () => {
      const mockFlashCards = [
        { id: 1, question: 'What is 2+2?', answer: '4' },
        { id: 2, question: 'What is the capital of France?', answer: 'Paris' },
      ];

      flashCardService.getAllFlashCards.mockResolvedValue(mockFlashCards);

      const res = await request(app)
        .get('/api/flashcards/1')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockFlashCards);
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.getAllFlashCards.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .get('/api/flashcards/1')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('POST /api/flashcards', () => {
    test('should create a new flashcard', async () => {
      const mockFlashCard = {
        id: 3,
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
        categoryId: 1,
      };

      flashCardService.createFlashCard.mockResolvedValue(mockFlashCard);

      const res = await request(app)
        .post('/api/flashcards')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({
          question: 'What is the capital of Germany?',
          answer: 'Berlin',
          categoryId: 1,
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockFlashCard);
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.createFlashCard.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .post('/api/flashcards')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({
          question: 'What is the capital of Germany?',
          answer: 'Berlin',
          categoryId: 1,
        });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('POST /api/flashcards/rating', () => {
    test('should add a rating to a flashcard set', async () => {
      const mockRating = { id: 1, flash_card_set_id: 1, rating: 5 };

      flashCardService.addRating.mockResolvedValue(mockRating);

      const res = await request(app)
        .post('/api/flashcards/rating')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({
          flash_card_set_id: 1,
          description: 'Good set!',
          rating: 5,
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockRating);
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.addRating.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .post('/api/flashcards/rating')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({
          flash_card_set_id: 1,
          description: 'Good set!',
          rating: 5,
        });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });

  describe('POST /api/flashcards/hide', () => {
    test('should hide a flashcard', async () => {
      flashCardService.hideFlashCard.mockResolvedValue({
        id: 1,
        hidden: true,
      });

      const res = await request(app)
        .post('/api/flashcards/hide')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({ flashCardId: 1 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, hidden: true });
    });

    test('should return 500 if there is a server error', async () => {
      flashCardService.hideFlashCard.mockRejectedValue(
        new Error('Database Error')
      );

      const res = await request(app)
        .post('/api/flashcards/hide')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYTk5OWViLWI1N2QtMTFlZi05NmM1LWNjMjhhYThjZWNkNCIsImVtYWlsIjoiY2hhbWlrYTk5QGdtYWlsLmNvbSIsImlhdCI6MTczMzY3NzYyMywiZXhwIjoxNzM2MjY5NjIzfQ.kGQPsY5rD1alHmc9HfgpCfChT4jk1DNrgLW4LRVlgv0')
        .send({ flashCardId: 1 });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Database Error' });
    });
  });
});
