import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'

const MainSection = ({
  todosCount,
  completedCount,
  actions,
  error,
  isLoading
}) => (
  <section className="main" style={{ opacity: isLoading ? 0.3 : 1 }}>
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <VisibleTodoList />
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
        actions={actions}
        error={error}
      />
    )}
  </section>
)

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
