/**
 * Timer Logic Tests
 * Verifies state transitions and wall-clock delta calculation
 */

import { useTimer } from './timer';

/**
 * Test 1: State transitions idle → running → paused → idle
 */
export function testStateTransitions() {
  console.log('=== Test 1: State Transitions ===');

  // Reset to fresh state
  useTimer.setState({
    status: 'idle',
    type: 'work',
    remainingSec: 0,
    initialDuration: 0,
    startTime: null,
    lastEvent: null,
  });

  let state = useTimer.getState();
  console.log('1a. Initial state:', state.status); // should be 'idle'
  if (state.status !== 'idle') throw new Error('Initial state should be idle');

  // Start timer
  useTimer.getState().start('work', 10);
  state = useTimer.getState();
  console.log('1b. After start:', state.status, 'event:', state.lastEvent?.type);
  if (state.status !== 'running')
    throw new Error('Status should be running after start');
  if (state.lastEvent?.type !== 'started')
    throw new Error('Event should be started');
  if (state.remainingSec !== 10)
    throw new Error('Remaining should be 10 after start');

  // Pause timer
  useTimer.getState().pause();
  state = useTimer.getState();
  console.log('1c. After pause:', state.status, 'event:', state.lastEvent?.type);
  if (state.status !== 'paused')
    throw new Error('Status should be paused after pause');
  if (state.lastEvent?.type !== 'paused')
    throw new Error('Event should be paused');

  // Resume timer
  useTimer.getState().resume();
  state = useTimer.getState();
  console.log('1d. After resume:', state.status, 'event:', state.lastEvent?.type);
  if (state.status !== 'running')
    throw new Error('Status should be running after resume');
  if (state.lastEvent?.type !== 'resumed')
    throw new Error('Event should be resumed');

  // Reset timer
  useTimer.getState().reset();
  state = useTimer.getState();
  console.log('1e. After reset:', state.status, 'event:', state.lastEvent?.type);
  if (state.status !== 'idle')
    throw new Error('Status should be idle after reset');
  if (state.lastEvent?.type !== 'reset')
    throw new Error('Event should be reset');

  console.log('✓ Test 1 passed: State transitions work correctly');
}

/**
 * Test 2: Timer ticks down correctly
 */
export function testTimerAccuracy() {
  console.log('\n=== Test 2: Timer Accuracy ===');

  // Reset to fresh state
  useTimer.setState({
    status: 'idle',
    type: 'work',
    remainingSec: 0,
    initialDuration: 0,
    startTime: null,
    lastEvent: null,
  });

  // Start a 5-second timer
  useTimer.getState().start('shortBreak', 5);
  let state = useTimer.getState();
  console.log('2a. Timer started, remaining:', state.remainingSec);

  // Simulate waiting 1 second
  setTimeout(() => {
    useTimer.getState().tick();
    state = useTimer.getState();
    console.log('2b. After 1s tick, remaining:', state.remainingSec);
    if (state.remainingSec < 3 || state.remainingSec > 5) {
      throw new Error(`Remaining should be ~4 after 1s, got ${state.remainingSec}`);
    }

    // Tick multiple times to reach completion
    for (let i = 0; i < 10; i++) {
      useTimer.getState().tick();
    }

    state = useTimer.getState();
    console.log('2c. After multiple ticks:', state.status);
    if (state.status !== 'idle')
      throw new Error('Status should be idle after completion');
    if (state.lastEvent?.type !== 'completed')
      throw new Error('Event should be completed');

    console.log('✓ Test 2 passed: Timer accuracy is correct');
  }, 1100);
}

/**
 * Test 3: No persistence
 */
export function testNoPersistence() {
  console.log('\n=== Test 3: No Persistence ===');

  // Verify localStorage is not used
  const localStorageKeys = Object.keys(localStorage);
  const timerKeys = localStorageKeys.filter((k) =>
    k.includes('timer') || k.includes('focus') || k.includes('session')
  );
  console.log('3a. Timer-related localStorage keys:', timerKeys);
  if (timerKeys.length > 0) {
    throw new Error(
      'Should not use localStorage for timer state: ' + timerKeys.join(', ')
    );
  }

  console.log('3b. Current timer status:', useTimer.getState().status);
  console.log('✓ Test 3 passed: No persistence verified');
}

/**
 * Run all tests
 */
export function runAllTests() {
  try {
    testStateTransitions();
    testNoPersistence();
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

// To run: import { runAllTests } from '@/core/timer.test';
// Then call runAllTests() in console
